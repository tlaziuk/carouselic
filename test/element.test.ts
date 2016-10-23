import { element } from '../src/element'

let selector = `html`
let badSelector = Number.NaN
let el = document.querySelector(selector)

describe(`element`, () => {
    it(`expect element(${selector}) to be not undefined`, (done: Function) => {
        expect(element(selector)).not.toBeUndefined()
        done()
    })
    it(`expect element(${el}) to be not undefined`, (done: Function) => {
        expect(element(el)).not.toBeUndefined()
        done()
    })
    it(`expect element(${badSelector}) to be undefined`, (done: Function) => {
        expect(element(badSelector)).toBeUndefined()
        done()
    })
})
