import { Carousel } from '../carousel'
import '../mod/wheel'
import { tree } from '../carousel.spec'
import { CarouselEvent } from '../event'

describe(`wheel`, () => {
    it(`expect Carousel to have wheel method`, (done: Function) => {
        expect(Carousel.prototype.wheel).not.toBeUndefined()
        done()
    })
    it(`expect Carousel method wheel to have working protector`, (done: Function) => {
        let mockTree = tree(document.createElement('div'))
        document.body.appendChild(mockTree.parent)
        let carousel = new Carousel(mockTree.container)
        expect(carousel.wheel).not.toBeUndefined()
        expect(carousel).not.toBeUndefined()
        expect(carousel._wheel).toEqual(false)
        carousel.wheel()
        expect(carousel._wheel).toEqual(true)
        done()
    })
    it(`expect Carousel wheel event to trigger properly`, (done: Function) => {
        let mockTree = tree(document.createElement('div'))
        document.body.appendChild(mockTree.parent)
        let carousel = new Carousel(mockTree.container)
        carousel.wheel()
        carousel.on(CarouselEvent.wheel, () => {
            done()
        })
        mockTree.container.dispatchEvent(new CustomEvent(`wheel`))
    })
