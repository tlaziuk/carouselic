import { Carousel, CarouselOpt } from './carousel'

declare global {
    interface Window {
        jQuery: {
            fn: any
        }
    }
}

if (window.jQuery && !window.jQuery.fn.Carouselic) {
    const map = new WeakMap<HTMLElement, Carousel>()
    window.jQuery.fn.Carouselic(function(this: any, options: CarouselOpt = {}) {
        let res: Carousel[] = []
        for (let element of this.get()) {
            if (!map.has(element)) {
                map.set(element, new Carousel(element, options))
            }
            res.push(map.get(element) as Carousel)
        }
        return res
    })
}
