import { each } from './each'

describe(`each`, () => {
    it(`expect ${each} to exists`, (done: Function) => {
        expect(each).not.toBeUndefined()
        done()
    })
    it(`expect ${each} to return ${Array}`, (done: Function) => {
        expect(each([], () => { }) instanceof Array).toBeTruthy()
        done()
    })
    it(`expect ${each} to have working scoping`, (done: Function) => {
        class TestMock { }
        each([0], function(this: TestMock) {
            expect(this instanceof TestMock).toBeTruthy()
            done()
        }, new TestMock())
    })
    it(`expect ${each} to have working arguments`, (done: Function) => {
        each([0], (arg) => {
            expect(arg).toEqual(0)
            done()
        })
    })
})
