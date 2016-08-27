import { CarouselElement, element as elFind, CarouselSize } from './element'
import { CarouselChild } from './child'
export interface StepInterface {
    step?: number
}
export interface CarouselOpt {
    elNext?: Element | string
    elPrev?: Element | string
    childSelector?: string
}
export class Carousel extends CarouselElement {
    protected child: CarouselChild[] = []
    protected elNext: Element
    protected elPrev: Element
    protected _current: CarouselChild
    constructor(element: Element, {elNext = '.next', elPrev = '.prev', childSelector = '.child'}: CarouselOpt = {}) {
        super(element)
        let childs = this.element.querySelectorAll(childSelector)
        for (let i = 0; i < childs.length; i++) {
            this.child.push(new CarouselChild(childs.item(i)))
        }
        this.elNext = elFind(elNext, this.element)
        this.elPrev = elFind(elPrev, this.element)
        this.elNext.addEventListener('click', (ev: MouseEvent) => {
            this.next()
        })
        this.elPrev.addEventListener('click', (ev: MouseEvent) => {
            this.previous()
        })
    }
    public get current(): CarouselChild {
        return this._current
    }
    public set current(el: CarouselChild) {
        this._current = el
        if (this._current.size.x >= this.current.size.y) {
            this._current.move({ x: 0, y: this._current.center.y, })
            let left = 0
            for (let i = this.child.indexOf(this._current); i >= 0; i--) {
                left -= this.child[i].center.x
                this.child[i].move({ x: left, y: this.child[i].center.y })
                left -= this.child[i].center.x
            }
            let right = 0
            for (let i = this.child.indexOf(this._current); i < this.child.length; i++) {
                right += this.child[i].center.x
                this.child[i].move({ x: right, y: this.child[i].center.y })
                right += this.child[i].center.x
            }
        } else {
            this._current.move({ x: this._current.center.x, y: 0, })
            let up = 0
            for (let i = this.child.indexOf(this._current); i >= 0; i--) {
                up -= this.child[i].center.y
                this.child[i].move({ x: this.child[i].center.x, y: up })
                up -= this.child[i].center.y
            }
            let down = 0
            for (let i = this.child.indexOf(this._current); i < this.child.length; i++) {
                down += this.child[i].center.y
                this.child[i].move({ x: this.child[i].center.x, y: down })
                down += this.child[i].center.y
            }
        }
    }
    public get currentIndex(): number {
        return this.child.indexOf(this.current)
    }
    public set currentIndex(index: number) {
        if (index < 0) {
            index = 0
        } else if (index >= this.child.length) {
            index = this.child.length - 1
        }
        this.current = this.child[index]
    }
    public get childSize(): CarouselSize {
        let x = 0;
        let y = 0;
        for (let el of this.child) {
            x += el.size.x
            y += el.size.y
        }
        return {
            x: x,
            y: y,
        }
    }
    public get childCenter(): CarouselSize {
        return {
            x: this.childSize.x / 2,
            y: this.childSize.y / 2,
        }
    }
    public get length(): number {
        return this.child.length
    }
    public next({step = 1}: StepInterface = {}): this {
        this.currentIndex += step
        return this
    }
    public previous({step = 1}: StepInterface = {}): this {
        this.currentIndex -= step
        return this
    }
}
