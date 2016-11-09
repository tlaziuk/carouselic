import { Carousel } from './carousel'
import { tree } from './carousel.spec'
import { CarouselEvent } from './event'

describe(`event`, () => {
    it(`expect Carousel event method to exists`, (done: Function) => {
        let mockTree = tree(document.createElement('div'))
        document.body.appendChild(mockTree.parent)
        let carousel = new Carousel(mockTree.container)
        expect(Carousel.on).not.toBeUndefined()
        expect(carousel.on).not.toBeUndefined()
        expect(carousel.emit).not.toBeUndefined()
        done()
    })
    it(`expect Carousel static event to work`, (done: Function) => {
        let mockTree = tree(document.createElement('div'))
        document.body.appendChild(mockTree.parent)
        Carousel.on(CarouselEvent.init, () => {
            done()
        })
        let carousel = new Carousel(mockTree.container)
    })
    it(`expect Carousel method event to work`, (done: Function) => {
        let mockTree = tree(document.createElement('div'))
        document.body.appendChild(mockTree.parent)
        let carousel = new Carousel(mockTree.container)
        carousel.on(CarouselEvent.move, () => {
            done()
        })
        carousel.move()
    })
    it(`expect Carousel emit event to work`, (done: Function) => {
        let mockTree = tree(document.createElement('div'))
        document.body.appendChild(mockTree.parent)
        let carousel = new Carousel(mockTree.container)
        const val = Carousel
        carousel.on(256, () => {
            return val
        })
        carousel.emit(256).then((res: any[]) => {
            if (res.indexOf(val) >= 0) {
                done()
            } else {
                done.fail()
            }
        })
    })
})
