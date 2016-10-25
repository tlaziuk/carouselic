import { Carousel } from '../src/carousel'
import { tree } from './carousel.spec'
import '../src/jquery.mod'

describe(`jQuery`, () => {
    const mockTree = tree(document.createElement('div'))
    document.body.appendChild(mockTree.parent)
    it(`expect ${Carousel} to be defined as jQuery plugin`, (done: DoneFn) => {
        expect(window.jQuery).not.toBeUndefined()
        expect(window.jQuery.fn.Carouselic).not.toBeUndefined()
        done()
    })
    it(`expect ${Carousel} jQuery plugin to return collection of instances`, (done: DoneFn) => {
        let res: Carousel[] = window.jQuery(mockTree.container).Carouselic()
        expect(res).not.toBeUndefined()
        for (let c of res) {
            expect(c instanceof Carousel).toBeTruthy()
        }
        done()
    })
    it(`expect ${Carousel} jQuery plugin to return collection of instances`, (done: DoneFn) => {
        let res1: Carousel[] = window.jQuery(mockTree.container).Carouselic()
        let res2: Carousel[] = window.jQuery(mockTree.container).Carouselic()
        expect(res1).not.toBeUndefined()
        expect(res2).not.toBeUndefined()
        for (let i in res1) {
            expect(res1[i]).toEqual(res2[i])
        }
        done()
    })
})
