export function element(el: any, parent: NodeSelector = document): Element {
    if (element instanceof Element) {
        return el
    }
    if (typeof el === `string`) {
        return parent.querySelector(el)
    }
    return undefined as never
}
