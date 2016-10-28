import { Orientation } from './orientation'

export interface CarouselOpt {
    childSelector?: string
    currentClass?: string
    orientation?: Orientation
    index?: number
}

export interface CarouselOptAll extends CarouselOpt {
    childSelector: string
    currentClass: string
    orientation: Orientation
    index: number
}

export const carousel: CarouselOptAll = {
    childSelector: `:scope > *`,
    orientation: Orientation.Automatic,
    currentClass: `current`,
    index: 0,
}
