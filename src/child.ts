import { CarouselElement, CarouselSize } from './element'

export class CarouselChild extends CarouselElement {
    protected element: HTMLElement
    public move({x = 0, y = 0}: CarouselSize = { x: 0, y: 0, }): this {
        this.element.style.transform = `translate(${x},${y})`
        return this
    }
}
