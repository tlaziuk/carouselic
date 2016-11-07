import { Carousel } from './carousel'
import { eventFn } from './async'
import { CarouselEvent } from './event'

export function wheel(this: Carousel) {
    if (!this._wheel) {
        this.element.addEventListener(`wheel`, eventFn<typeof Carousel.prototype.element, WheelEvent>(function(this: typeof Carousel.prototype.element, evt: WheelEvent, carousel: Carousel) {
            carousel.move({
                step: evt.deltaX + evt.deltaY + evt.deltaZ,
            })
            carousel.emit(CarouselEvent.wheel, evt)
        }, this))
        this._wheel = true
    }
    return this
}

Carousel.prototype.wheel = wheel
Carousel.prototype._wheel = false

declare module './carousel' {
    interface Carousel {
        wheel: typeof wheel
        _wheel: boolean
    }
}
