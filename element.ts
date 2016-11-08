export function element(el: any, parent: NodeSelector = document): Element {
    if (el instanceof Element) {
        return el
    }
    if (typeof el === `string`) {
        return parent.querySelector(el) as Element
    }
    return undefined as never
}
