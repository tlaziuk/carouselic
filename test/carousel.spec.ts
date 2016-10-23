export interface TreeInterface {
    parent: HTMLElement
    container: HTMLUListElement
    element: HTMLLIElement[]
}

export function tree(parentElement: HTMLElement, count: number = 8, width: number = 200, height: number = 100, childSize: number = Math.min(width, height) / 2): TreeInterface {
    let container = document.createElement(`ul`)
    parentElement.appendChild(container)
    container.style.width = `${width}px`
    container.style.height = `${height}px`
    container.style.position = `relative`
    let element: HTMLLIElement[] = []
    let counter = 0
    while (counter < count) {
        counter++
        let el = document.createElement(`li`)
        el.style.width = `${childSize}px`
        el.style.height = `${childSize}px`
        el.style.position = `absolute`
        container.appendChild(el)
        element.push(el)
    }
    return {
        parent: parentElement,
        container: container,
        element: element,
    }
}
