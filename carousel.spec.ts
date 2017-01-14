import { Carousel, Mode, Orientation } from './index'
import { size } from './size'

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

describe(`Carousel`, () => {
    it(`expect Carousel to be not undefined`, (done: Function) => {
        expect(Carousel).not.toBeUndefined()
        done()
    })
    it(`expect Carousel to be instantiable`, (done: Function) => {
        let mockTree = tree(document.createElement('div'))
        document.body.appendChild(mockTree.parent)
        let carousel = new Carousel(mockTree.container)
        expect(carousel).not.toBeUndefined()
        done()
    })
    it(`expect Carousel to move`, (done: Function) => {
        let mockTree = tree(document.createElement('div'))
        document.body.appendChild(mockTree.parent)
        let carousel = new Carousel(mockTree.container)
        expect(carousel).not.toBeUndefined()
        expect(carousel.move({ step: Number.POSITIVE_INFINITY, mode: Mode.Single, orientation: Orientation.Horiziontal, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.NEGATIVE_INFINITY, mode: Mode.Single, orientation: Orientation.Horiziontal, })).not.toBeUndefined()
        expect(carousel.move({ step: 0, mode: Mode.Single, orientation: Orientation.Horiziontal, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.POSITIVE_INFINITY, mode: Mode.Multi, orientation: Orientation.Horiziontal, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.NEGATIVE_INFINITY, mode: Mode.Multi, orientation: Orientation.Horiziontal, })).not.toBeUndefined()
        expect(carousel.move({ step: 0, mode: Mode.Multi, orientation: Orientation.Horiziontal, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.POSITIVE_INFINITY, mode: Mode.Rotate, orientation: Orientation.Horiziontal, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.NEGATIVE_INFINITY, mode: Mode.Rotate, orientation: Orientation.Horiziontal, })).not.toBeUndefined()
        expect(carousel.move({ step: 0, mode: Mode.Rotate, orientation: Orientation.Horiziontal, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.POSITIVE_INFINITY, mode: Mode.Single, orientation: Orientation.Vertical, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.NEGATIVE_INFINITY, mode: Mode.Single, orientation: Orientation.Vertical, })).not.toBeUndefined()
        expect(carousel.move({ step: 0, mode: Mode.Single, orientation: Orientation.Vertical, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.POSITIVE_INFINITY, mode: Mode.Multi, orientation: Orientation.Vertical, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.NEGATIVE_INFINITY, mode: Mode.Multi, orientation: Orientation.Vertical, })).not.toBeUndefined()
        expect(carousel.move({ step: 0, mode: Mode.Multi, orientation: Orientation.Vertical, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.POSITIVE_INFINITY, mode: Mode.Rotate, orientation: Orientation.Vertical, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.NEGATIVE_INFINITY, mode: Mode.Rotate, orientation: Orientation.Vertical, })).not.toBeUndefined()
        expect(carousel.move({ step: 0, mode: Mode.Rotate, orientation: Orientation.Vertical, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.POSITIVE_INFINITY, mode: Mode.Single, orientation: Orientation.Automatic, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.NEGATIVE_INFINITY, mode: Mode.Single, orientation: Orientation.Automatic, })).not.toBeUndefined()
        expect(carousel.move({ step: 0, mode: Mode.Single, orientation: Orientation.Automatic, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.POSITIVE_INFINITY, mode: Mode.Multi, orientation: Orientation.Automatic, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.NEGATIVE_INFINITY, mode: Mode.Multi, orientation: Orientation.Automatic, })).not.toBeUndefined()
        expect(carousel.move({ step: 0, mode: Mode.Multi, orientation: Orientation.Automatic, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.POSITIVE_INFINITY, mode: Mode.Rotate, orientation: Orientation.Automatic, })).not.toBeUndefined()
        expect(carousel.move({ step: Number.NEGATIVE_INFINITY, mode: Mode.Rotate, orientation: Orientation.Automatic, })).not.toBeUndefined()
        expect(carousel.move({ step: 0, mode: Mode.Rotate, orientation: Orientation.Automatic, })).not.toBeUndefined()
        done()
    })
    it(`expect Carousel element to be in viewport`, (done: Function) => {
        let mockTree = tree(document.createElement('div'))
        document.body.appendChild(mockTree.parent)
        let carousel = new Carousel(mockTree.container)
        expect(carousel).not.toBeUndefined()
        expect(carousel.inViewport(carousel.element)).toBeTruthy()
        done()
    })
    it(`expect Carousel elements to be arranged`, (done: Function) => {
        let mockTree = tree(document.createElement('div'))
        document.body.appendChild(mockTree.parent)
        let carousel = new Carousel(mockTree.container)
        expect(carousel).not.toBeUndefined()
        let child = carousel.child()
        carousel.current(child[carousel.indexParse(carousel.length / 2, child)]).then((el: HTMLElement) => {
            let elements = carousel.child()
            let currentSize = size(elements[carousel.index])
            let nextSize = size(elements[carousel.index + 1])
            let previousSize = size(elements[carousel.index - 1])
            expect(previousSize.absoluteCenter.x).toBeLessThan(currentSize.absoluteCenter.x, [previousSize, currentSize])
            expect(nextSize.absoluteCenter.x).toBeGreaterThan(currentSize.absoluteCenter.x, [nextSize, currentSize])
            done()
        })
    })
})
