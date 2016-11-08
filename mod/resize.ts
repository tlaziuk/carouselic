import { Carousel } from '../carousel'
import { on, CarouselEvent } from '../event'

if (window) {
    on(CarouselEvent.init, function(this: Carousel) {
        window.addEventListener('resize', (ev: UIEvent) => {
            this.move()
        })
    })
}
