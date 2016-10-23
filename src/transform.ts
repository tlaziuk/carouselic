export interface TranslateInterface {
    x?: number
    y?: number
}

export function translate(el: HTMLElement, {x = 0, y = 0, }: TranslateInterface = {}): HTMLElement {
    const transform = `translate(${x}px,${y}px)`
    el.style.transform = transform
    el.style.webkitTransform = transform
    return el
}
