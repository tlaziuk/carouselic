import { promiseFn } from '../src/async'

describe(`async`, () => {
    it(`expect ${promiseFn} to exists`, (done: Function) => {
        expect(promiseFn).not.toBeUndefined()
        done()
    })
    it(`expect ${promiseFn} to return ${Promise}`, (done: Function) => {
        expect(promiseFn(() => { }) instanceof Promise).toBeTruthy()
        done()
    })
    it(`expect ${promiseFn} to fail`, (done: Function) => {
        promiseFn(() => { throw `error` }).catch(() => { done() })
    })
    it(`expect ${promiseFn} to succeed`, (done: Function) => {
        promiseFn(() => { }).then(() => { done() })
    })
    it(`expect ${promiseFn} to have working scoping`, (done: Function) => {
        class testMock {
            a = 1
        }
        promiseFn(function(this: testMock) {
            expect(this).not.toBeUndefined()
            expect(this.a).toEqual(1)
        }, new testMock).then(() => { done() }, (err) => { done.fail(err) })
    })
    it(`expect ${promiseFn} to have working arguments`, (done: Function) => {
        class testMock {
            static A = 2
            static B = testMock.A ** testMock.A
            a = testMock.A
            b = testMock.B
        }
        promiseFn(function(this: testMock, val1: any, val2: any) {
            expect(this).not.toBeUndefined()
            expect(this.a).toEqual(val1)
            expect(this.b).toEqual(val2)
        },
            new testMock,
            testMock.A, testMock.B).then(() => { done() }, (err) => { done.fail(err) })
    })
})
