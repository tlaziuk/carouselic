import { Carousel } from '../carousel'
import { CarouselEvent } from '../event'

export function wheel(this: Carousel) {
    if (!this._wheel) {
        this.element.addEventListener(`wheel`, async (evt: WheelEvent) => {
            this.move({
                step: evt.deltaX + evt.deltaY + evt.deltaZ,
            })
            this.emit(CarouselEvent.wheel, evt)
        })
        this._wheel = true
    }
    return this
}

Carousel.prototype.wheel = wheel
Carousel.prototype._wheel = false

declare module '../carousel' {
    interface Carousel {
        wheel: typeof wheel
        _wheel: boolean
    }
}
