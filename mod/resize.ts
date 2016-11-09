import { Carousel } from '../carousel'
import { CarouselEvent } from '../event'

if (window) {
    Carousel.on(CarouselEvent.init, function(this: Carousel) {
        window.addEventListener('resize', (ev: UIEvent) => {
            this.move()
        })
    })
}
