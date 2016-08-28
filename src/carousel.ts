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
        if (this.child.length) {
            this.currentIndex = this.child.length / 2
        }
        this.elNext = elFind(elNext, this.element)
        if (this.elNext) {
            this.elNext.addEventListener('click', (ev: MouseEvent) => {
                this.move({ step: 1 })
            })
            this.elNext.classList.add('next')
        }
        this.elPrev = elFind(elPrev, this.element)
        if (this.elPrev) {
            this.elPrev.addEventListener('click', (ev: MouseEvent) => {
                this.move({ step: -1 })
            })
            this.elPrev.classList.add('prev')
        }
        this.element.addEventListener('wheel', (ev: WheelEvent) => {
            this.move({ step: ev.deltaX + ev.deltaY + ev.deltaZ < 0 ? -1 : 1 })
        })
        if (window) {
            window.addEventListener('resize', (ev: UIEvent) => {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(this.move)
                } else {
                    setTimeout(this.move, 0)
                }
            })
        }
    }
    public get current(): CarouselChild {
        return this._current
    }
    public set current(el: CarouselChild) {
        this._current = el
        if (this.size.width >= this.size.height) {
            this._current.move({ x: 0, y: this._current.size.center.y, })
            let left = this._current.size.center.x
            for (let i = this.child.indexOf(this._current); i >= 0; i--) {
                left -= this.child[i].size.center.x
                this.child[i].move({ x: left, y: this.size.center.y - this.child[i].size.center.y })
                left -= this.child[i].size.center.x
            }
            let right = -this._current.size.center.x
            for (let i = this.child.indexOf(this._current); i < this.child.length; i++) {
                right += this.child[i].size.center.x
                this.child[i].move({ x: right, y: this.size.center.y - this.child[i].size.center.y })
                right += this.child[i].size.center.x
            }
        } else {
            this._current.move({ x: this._current.size.center.x, y: 0, })
            let up = this._current.size.center.y
            for (let i = this.child.indexOf(this._current); i >= 0; i--) {
                up -= this.child[i].size.center.y
                this.child[i].move({ x: this.size.center.x - this.child[i].size.center.x, y: up })
                up -= this.child[i].size.center.y
            }
            let down = -this._current.size.center.y
            for (let i = this.child.indexOf(this._current); i < this.child.length; i++) {
                down += this.child[i].size.center.y
                this.child[i].move({ x: this.size.center.x - this.child[i].size.center.x, y: down })
                down += this.child[i].size.center.y
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
    public move({step = 0}: StepInterface = {}): this {
        this.currentIndex += step
        return this
    }
}
