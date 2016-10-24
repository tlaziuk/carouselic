import { Carousel } from './carousel'
import { on, CarouselEvent } from './event'

if (window) {
    on(CarouselEvent.INIT, function(this: Carousel) {
        window.addEventListener('resize', (ev: UIEvent) => {
            this.move()
        })
    })
}
