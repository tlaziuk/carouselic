import { Carousel } from './carousel'
import { promiseFn } from './async'
import { eachFn } from './each'

export const enum CarouselEvent {
    child = 1,
    current = child << 1,
    init = current << 1,
    move = init << 1,
    visible = move << 1,
    wheel = visible << 1,
}

export type CarouselEventFunction = (this: Carousel, ...args: any[]) => void

interface CarouselEventInterface {
    [key: number]: CarouselEventFunction[]
}

let EVT: CarouselEventInterface = {}

export function emit(this: Carousel, evt: CarouselEvent, ...args: any[]) {
    return promiseFn<Carousel, any[]>(function(this: Carousel) {
        let res: any[] = []
        for (let t in EVT) {
            let evtVal = parseInt(t)
            if (evtVal | evt) {
                res.push(...eachFn<Carousel, any>(EVT[t], this, ...args))
            }
        }
        return res
    }, this)
}

export function on(evt: number, fn: CarouselEventFunction): void {
    if (!EVT[evt]) {
        EVT[evt] = []
    }
    EVT[evt].push(fn)
}
