export interface CarouselElementCooridinates {
    x: number
    y: number
}
export interface CarouselSize extends ClientRect {
    center: CarouselElementCooridinates
    absoluteCenter: CarouselElementCooridinates
}
export function element(el: any, parent: NodeSelector = document): Element {
    if (element instanceof Element) {
        return el
    }
    if (typeof el === `string`) {
        return parent.querySelector(el)
    }
    return undefined as never;
}
export abstract class CarouselElement {
    constructor(protected element: HTMLElement, protected childSelector: string = '.child') { }
    public size(el = this.element): CarouselSize {
        let size = el.getBoundingClientRect()
        return {
            bottom: size.bottom,
            top: size.top,
            left: size.left,
            right: size.right,
            width: size.width,
            height: size.height,
            center: {
                x: size.width / 2,
                y: size.height / 2,
            },
            absoluteCenter: {
                x: size.left + size.width / 2,
                y: size.top + size.height / 2,
            },
        }
    }
}
