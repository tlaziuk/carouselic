import { Carousel } from './carousel'

export const enum CarouselEvent {
    child = 1,
    current = child << 1,
    init = current << 1,
    move = init << 1,
    visible = move << 1,
    wheel = visible << 1,
}

export { CarouselEvent as Event }

export type CarouselEventFunction = (this: Carousel, ...args: any[]) => void

export interface CarouselEventInterface {
    [key: number]: CarouselEventFunction[]
}

export function on(this: { evt: CarouselEventInterface }, evt: number, fn: CarouselEventFunction) {
    if (!this.evt[evt]) {
        this.evt[evt] = []
    }
    this.evt[evt].push(fn)
    return this
}
