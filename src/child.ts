import { CarouselElement, CarouselElementCooridinates } from './element'

export class CarouselChild extends CarouselElement {
    protected element: HTMLElement
    public move({x = 0, y = 0}: CarouselElementCooridinates = { x: 0, y: 0, }): this {
        this.element.style.transform = `translate(${x}px,${y}px)`
        return this
    }
}
