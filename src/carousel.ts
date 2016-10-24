import { Mode } from './mode'
import { Orientation } from './orientation'
import { each } from './each'
import { element as find } from './element'
import { on, emit, CarouselEvent } from './event'
import { promiseFn } from './async'
import { size, SizeInterface, SizeCooridinatesInterface } from './size'
import { translate as transformTranslate, TranslateInterface } from './transform'

export interface MoveInterface {
    next: boolean
    previous: boolean
}

export interface StepInterface {
    mode?: Mode
    orientation?: Orientation
    step?: number
}

export interface CarouselOpt {
    childSelector?: string
    currentClass?: string
    orientation?: Orientation
    index?: number
}

export type CarouselVisibleTuple = [HTMLElement, number]

export interface CarouselVisibleInterface {
    first: CarouselVisibleTuple
    last: CarouselVisibleTuple
}

export class Carousel {
    protected emit = emit
    protected orientation: Orientation
    protected currentClass: string
    protected childSelector: string
    constructor(protected element: HTMLElement, {childSelector = `:scope > *`, orientation = Orientation.Automatic, currentClass = `current`, index = 0, }: CarouselOpt = {}) {
        this.childSelector = childSelector
        this.orientation = orientation
        this.currentClass = currentClass
        this.index = this.indexParse(index)
        this.emit(CarouselEvent.INIT)
    }
    public child(): HTMLElement[] {
        let childs = this.element.querySelectorAll(this.childSelector) as NodeListOf<HTMLElement>
        let result = [] as HTMLElement[]
        for (let i = 0; i < childs.length; i++) {
            result.push(childs.item(i))
        }
        return result
    }
    protected _current: HTMLElement
    public current(el: HTMLElement = this._current): Promise<HTMLElement> {
        this._current = el
        return promiseFn<Carousel, HTMLElement>(function(this: Carousel) {
            const child = this.child()
            const currentSize = size(this._current)
            const index = this.index
            const thisSize = size(this.element)
            each<Carousel, void, HTMLElement>(child, function(this: Carousel, el: HTMLElement) {
                el.classList.remove(this.currentClass)
            }, this)
            this._current.classList.add(this.currentClass)
            let orientation: Orientation = this.parseOrientation(this.orientation, thisSize)
            let yParameter: 'x' | 'y'
            let leftParameter: 'left' | 'top'
            let rightParameter: 'right' | 'bottom'
            let widthParameter: 'width' | 'height'
            let fn: (before: number, after: number) => TranslateInterface
            if (orientation === Orientation.Horiziontal) {
                fn = (before: number, after: number) => {
                    return { x: before, y: after, }
                }
                yParameter = 'y'
                leftParameter = 'left'
                rightParameter = 'right'
                widthParameter = 'width'
            } else {
                fn = (before: number, after: number) => {
                    return { x: after, y: before, }
                }
                yParameter = 'x'
                leftParameter = 'top'
                rightParameter = 'bottom'
                widthParameter = 'height'
            }
            let left: number
            let right: number
            if (!this.inViewport(this._current, orientation, thisSize)) {
                if (currentSize[rightParameter] >= thisSize[rightParameter]) {
                    left = thisSize[widthParameter] - currentSize[widthParameter]
                } else {
                    left = 0
                }
            } else {
                if (index === 0) {
                    left = 0
                } else {
                    left = currentSize[leftParameter] - thisSize[leftParameter]
                }
            }
            right = left + currentSize[widthParameter]
            transformTranslate(this._current, fn(left, thisSize.center[yParameter] - currentSize.center[yParameter]))
            for (let i = index - 1; i >= 0; i--) {
                let childElement = child[i]
                let childSize = size(childElement)
                left -= childSize[widthParameter]
                transformTranslate(childElement, fn(left, thisSize.center[yParameter] - childSize.center[yParameter]))
            }
            for (let i = index + 1; i < child.length; i++) {
                let childElement = child[i]
                let childSize = size(childElement)
                transformTranslate(childElement, fn(right, thisSize.center[yParameter] - currentSize.center[yParameter]))
                right += childSize[widthParameter]
            }
            return el
        }, this)
    }
    protected parseOrientation(orientation: Orientation = this.orientation, thisSize: SizeInterface = size(this.element)): Orientation {
        if (orientation === Orientation.Automatic) {
            if (thisSize.width >= thisSize.height) {
                orientation = Orientation.Horiziontal
            } else {
                orientation = Orientation.Vertical
            }
        }
        return orientation
    }
    public inViewport(element: HTMLElement, orientation: Orientation = this.orientation, thisSize: SizeInterface = size(this.element)): boolean {
        const elementSize = size(element)
        orientation = this.parseOrientation(orientation, thisSize)
        if (orientation === Orientation.Horiziontal) {
            return thisSize.left <= elementSize.left && elementSize.right <= thisSize.right
        } else {
            return thisSize.top <= elementSize.top && elementSize.bottom <= thisSize.bottom
        }
    }
    public indexParse(index: number, child: HTMLElement[] = this.child()): number {
        index = Math.round(index)
        if (index < 0) {
            index = 0
        } else if (index >= child.length) {
            index = child.length - 1
        }
        return index
    }
    public get index(): number {
        return this.child().indexOf(this._current)
    }
    public set index(index: number) {
        let child = this.child()
        this.current(child[this.indexParse(index, child)])
    }
    public get length(): number {
        return this.child().length
    }
    protected getVisible(orientation: Orientation = this.orientation, thisSize: SizeInterface = size(this.element)): CarouselVisibleInterface {
        const child = this.child()
        orientation = this.parseOrientation(orientation, thisSize)
        let result: CarouselVisibleInterface = {
            first: [child[child.length - 1], child.length - 1],
            last: [child[0], 0],
        }
        for (let el of child) {
            if (this.inViewport(el, orientation, thisSize)) {
                let index = child.indexOf(el)
                if (index < result.first[1]) {
                    result.first = [el, index]
                }
                if (index > result.last[1]) {
                    result.last = [el, index]
                }
            }
        }
        return result
    }
    public move({step = 0, orientation = this.orientation, mode = Mode.Single, }: StepInterface = {}): MoveInterface {
        this.orientation = orientation
        let result: MoveInterface = {
            next: false,
            previous: false,
        }
        let visible = this.getVisible()
        let first = visible.first[1]
        let last = visible.last[1]
        switch (mode) {
            case Mode.Rotate:
                step = (last === first ? 1 : last - first + 1) * step
            case Mode.Multi:
                if (step < 0) {
                    this.index = first + step
                    first = this.index
                    last += first - visible.first[1]
                } else if (step > 0) {
                    this.index = last + step
                    last = this.index
                    first += last - visible.last[1]
                } else {
                    this.index = this.index
                }
                result.previous = first > 0
                result.next = last < this.length - 1
                break
            case Mode.Single:
            default:
                this.index += step
                result.next = this.index < this.length - 1
                result.previous = this.index > 0
                break
        }
        return result
    }
}
