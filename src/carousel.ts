import { CarouselElement, element as find, CarouselSize } from './element'
import { translate as transformTranslate, TranslateInterface } from './transform'
export enum Orientation {
    Automatic,
    Horiziontal,
    Vertical,
}
export enum Mode {
    Single,
    Multi,
    Rotate,
}
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
}
export type CarouselVisible = [HTMLElement, number]
export interface CarouselVisibleInterface {
    first: CarouselVisible
    last: CarouselVisible
}
export class Carousel extends CarouselElement {
    protected orientation: Orientation
    protected currentClass: string
    constructor(element: HTMLElement, {childSelector = '.child', orientation = Orientation.Automatic, currentClass = 'current' }: CarouselOpt = {}) {
        super(element, childSelector)
        this.orientation = orientation
        this.currentClass = currentClass
        if (this.child.length) {
            this.currentIndex = 0
        }
        if (window) {
            window.addEventListener('resize', (ev: UIEvent) => this.move())
        }
    }
    protected get child(): HTMLElement[] {
        let childs = this.element.querySelectorAll(this.childSelector) as NodeListOf<HTMLElement>
        let result = [] as HTMLElement[]
        for (let i = 0; i < childs.length; i++) {
            result.push(childs.item(i))
        }
        return result
    }
    protected each(fn: (el: HTMLElement) => void): this {
        for (let i of this.child) {
            fn(i)
        }
        return this
    }
    protected event(fn: (...args: any[]) => any): (...args: any[]) => any {
        if (typeof requestAnimationFrame === `function`) {
            return (...args: any[]) => requestAnimationFrame(fn.bind(this, ...args))
        }
        return (...args: any[]) => setTimeout(fn.bind(this, ...args), 0)
    }
    protected _current: HTMLElement
    public get current(): HTMLElement {
        return this._current
    }
    public set current(el: HTMLElement) {
        this._current = el
        this.event(() => {
            this.each((el: HTMLElement) => { el.classList.remove(this.currentClass) })
            this._current.classList.add(this.currentClass)
            const currentSize = this.size(this._current)
            const currentIndex = this.currentIndex
            const thisSize = this.size(this.element)
            const child = this.child
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
                if (currentIndex === 0) {
                    left = 0
                } else {
                    left = currentSize[leftParameter] - thisSize[leftParameter]
                }
            }
            right = left + currentSize[widthParameter]
            this._current.style.transform = transformTranslate(fn(left, thisSize.center[yParameter] - currentSize.center[yParameter]))
            for (let i = currentIndex - 1; i >= 0; i--) {
                let childElement = child[i]
                let childSize = this.size(childElement)
                left -= childSize[widthParameter]
                childElement.style.transform = transformTranslate(fn(left, thisSize.center[yParameter] - childSize.center[yParameter]))
            }
            for (let i = currentIndex + 1; i < child.length; i++) {
                let childElement = child[i]
                let childSize = this.size(childElement)
                childElement.style.transform = transformTranslate(fn(right, thisSize.center[yParameter] - currentSize.center[yParameter]))
                right += childSize[widthParameter]
            }
        })()
    }
    protected parseOrientation(orientation: Orientation = this.orientation, thisSize: CarouselSize = this.size(this.element)): Orientation {
        if (orientation === Orientation.Automatic) {
            if (thisSize.width >= thisSize.height) {
                orientation = Orientation.Horiziontal
            } else {
                orientation = Orientation.Vertical
            }
        }
        return orientation
    }
    protected inViewport(element: HTMLElement, orientation: Orientation = this.orientation, thisSize: CarouselSize = this.size(this.element)): boolean {
        const elementSize = this.size(element)
        orientation = this.parseOrientation(orientation, thisSize)
        if (orientation === Orientation.Horiziontal) {
            return thisSize.left <= elementSize.left && elementSize.right <= thisSize.right
        } else {
            return thisSize.top <= elementSize.top && elementSize.bottom <= thisSize.bottom
        }
    }
    public get currentIndex(): number {
        return this.child.indexOf(this.current)
    }
    public set currentIndex(index: number) {
        index = Math.round(index)
        let childs = this.child
        if (index < 0) {
            index = 0
        } else if (index >= childs.length) {
            index = childs.length - 1
        }
        this.current = childs[index]
    }
    public get length(): number {
        return this.child.length
    }
    protected getVisible(orientation: Orientation = this.orientation, thisSize: CarouselSize = this.size(this.element)): CarouselVisibleInterface {
        const childs = this.child
        orientation = this.parseOrientation(orientation, thisSize)
        let result: CarouselVisibleInterface = {
            first: [childs[childs.length - 1], childs.length - 1],
            last: [childs[0], 0],
        }
        for (let child of childs) {
            if (this.inViewport(child, orientation, thisSize)) {
                let index = childs.indexOf(child)
                if (index < result.first[1]) {
                    result.first = [child, index]
                }
                if (index > result.last[1]) {
                    result.last = [child, index]
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
                    this.currentIndex = first + step
                    first = this.currentIndex
                    last += first - visible.first[1]
                } else if (step > 0) {
                    this.currentIndex = last + step
                    last = this.currentIndex
                    first += last - visible.last[1]
                } else {
                    this.currentIndex = this.currentIndex
                }
                result.previous = first > 0
                result.next = last < this.length - 1
                break
            case Mode.Single:
            default:
                this.currentIndex += step
                result.next = this.currentIndex < this.length - 1
                result.previous = this.currentIndex > 0
                break
        }
        return result
    }
}
