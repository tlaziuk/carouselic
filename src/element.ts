export interface CarouselSize {
    x: number
    y: number
}
export function element(el: any, parent: NodeSelector = document): Element {
    if (element instanceof Element) {
        return el
    }
    if (typeof el === `string`) {
        return parent.querySelector(el)
    }
    return el as never;
}
export abstract class CarouselElement {
    constructor(protected element: Element) { }
    public get size(): CarouselSize {
        return {
            x: this.element.clientWidth,
            y: this.element.clientHeight,
        }
    }
    public get center(): CarouselSize {
        return {
            x: this.size.x / 2,
            y: this.size.y / 2,
        }
    }
}
