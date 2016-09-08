import { CarouselElement, element as find, CarouselSize } from './element'
import { translate as transformTranslate } from './transform'
export interface MoveInterface {
    next: boolean
    previous: boolean
}
export interface StepInterface {
    step?: number
}
export interface CarouselOpt {
    childSelector?: string
}
export class Carousel extends CarouselElement {
    constructor(element: HTMLElement, {childSelector = '.child'}: CarouselOpt = {}) {
        super(element, childSelector)
        if (this.child.length) {
            this.currentIndex = 0
        }
        if (window) {
            window.addEventListener('resize', this.event<UIEvent>((ev: UIEvent) => this.move()))
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
    protected event<T extends Event>(fn: (ev: T) => any): (this: this, ev: T) => any {
        if (window.requestAnimationFrame) {
            return (ev: T) => window.requestAnimationFrame(fn.bind(this, ev))
        }
        return (ev: T) => setTimeout(fn.bind(this, ev), 0)
    }
    protected _current: HTMLElement
    public get current(): HTMLElement {
        return this._current
    }
    public set current(el: HTMLElement) {
        this._current = el
        const currentSize = this.size(this._current)
        const thisSize = this.size(this.element)
        const child = this.child
        if (thisSize.width >= thisSize.height) {
            this._current.style.transform = transformTranslate({ x: 0, y: currentSize.center.y, })
            let left = currentSize.center.x
            for (let i = child.indexOf(this._current); i >= 0; i--) {
                let childSize = this.size(child[i]);
                left -= childSize.center.x
                child[i].style.transform = transformTranslate({ x: left, y: thisSize.center.y - childSize.center.y, })
                left -= childSize.center.x
            }
            let right = -currentSize.center.x
            for (let i = child.indexOf(this._current); i < child.length; i++) {
                let childSize = this.size(child[i]);
                right += childSize.center.x
                child[i].style.transform = transformTranslate({ x: right, y: thisSize.center.y - childSize.center.y, })
                right += childSize.center.x
            }
        } else {
            this._current.style.transform = transformTranslate({ x: currentSize.center.x, y: 0, })
            let up = currentSize.center.y
            for (let i = child.indexOf(this._current); i >= 0; i--) {
                let childSize = this.size(child[i]);
                up -= childSize.center.y
                child[i].style.transform = transformTranslate({ x: thisSize.center.x - childSize.center.x, y: up, })
                up -= childSize.center.y
            }
            let down = -currentSize.center.y
            for (let i = child.indexOf(this._current); i < child.length; i++) {
                let childSize = this.size(child[i]);
                down += childSize.center.y
                child[i].style.transform = transformTranslate({ x: thisSize.center.x - childSize.center.x, y: down, })
                down += childSize.center.y
            }
        }
    }
    public get currentIndex(): number {
        return this.child.indexOf(this.current)
    }
    public set currentIndex(index: number) {
        index = Math.round(index)
        if (index < 0) {
            index = 0
        } else if (index >= this.child.length) {
            index = this.child.length - 1
        }
        this.current = this.child[index]
    }
    public get length(): number {
        return this.child.length
    }
    public move({step = 0}: StepInterface = {}): MoveInterface {
        this.currentIndex += step
        return {
            next: this.currentIndex < (this.length - 1),
            previous: this.currentIndex > 0,
        }
    }
}
