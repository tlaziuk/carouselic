export interface SizeCooridinatesInterface {
    x: number
    y: number
    [key: string]: any

}
export interface SizeInterface extends ClientRect {
    center: SizeCooridinatesInterface
    absoluteCenter: SizeCooridinatesInterface
    [key: string]: any
}
export function size(el: HTMLElement): SizeInterface {
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
