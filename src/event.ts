import { Carousel } from './carousel'
import { promiseFn } from './async'
import { eachFn } from './each'

export const enum CarouselEvent {
    INIT = 1,
}

export type CarouselEventFunction = (this: Carousel, ...args: any[]) => void

interface CarouselEventInterface {
    [key: number]: CarouselEventFunction[]
}

let EVT: CarouselEventInterface = {}

export function emit(this: Carousel, evt: CarouselEvent, ...args: any[]) {
    return promiseFn<Carousel, void>(function(this: Carousel) {
        for (let t in EVT) {
            let evtVal = parseInt(t)
            if (evtVal | evt) {
                eachFn(EVT[t], this, ...args)
            }
        }
    }, this)
}

export function on(evt: CarouselEvent, fn: CarouselEventFunction) {
    if (!EVT[evt]) {
        EVT[evt] = []
    }
    EVT[evt].push(fn)
}
