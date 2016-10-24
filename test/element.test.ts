import { element } from '../src/element'

const selector = `html`
const badSelector = Number.NaN
const el = document.querySelector(selector)

describe(`element`, () => {
    it(`expect element(${selector}) to be not undefined`, (done: Function) => {
        expect(element(selector)).not.toBeUndefined()
        done()
    })
    it(`expect element(${selector}) to be instanceof ${Element}`, (done: Function) => {
        expect(element(selector) instanceof Element).toBeTruthy()
        done()
    })
    it(`expect element(${el}) to be not undefined`, (done: Function) => {
        expect(element(el)).not.toBeUndefined()
        done()
    })
    it(`expect element(${el}) to be instanceof ${Element}`, (done: Function) => {
        expect(element(el) instanceof Element).toBeTruthy()
        done()
    })
    it(`expect element(${badSelector}) to be undefined`, (done: Function) => {
        expect(element(badSelector)).toBeUndefined()
        done()
    })
})
