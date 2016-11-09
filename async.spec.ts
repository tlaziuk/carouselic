import { eventFn } from './async'

describe(`eventFn`, () => {
    it(`expect ${eventFn} to exists`, (done: Function) => {
        expect(eventFn).not.toBeUndefined()
        done()
    })
    it(`expect ${eventFn} to return ${Function}`, (done: Function) => {
        expect(eventFn(() => { }) instanceof Function).toBeTruthy()
        done()
    })
    it(`expect ${eventFn} to have working scoping`, (done: Function) => {
        class TestMock {
            a = 1
        }
        eventFn(function(this: testMock) {
            expect(this).not.toBeUndefined()
            expect(this.a).toEqual(1)
            done()
        }).apply(new TestMock)
    })
    it(`expect ${eventFn} to have working arguments`, (done: Function) => {
        class TestMock {
            static A = 2
            static B = TestMock.A ** TestMock.A
            a = TestMock.A
            b = TestMock.B
        }
        eventFn(function(this: TestMock, evt: any, val1: any, val2: any) {
            expect(this).not.toBeUndefined()
            expect(this.a).toEqual(val1)
            expect(this.b).toEqual(val2)
            done()
        }, TestMock.A, TestMock.B).call(new TestMock)
    })
    it(`expect ${eventFn} to have working event`, (done: Function) => {
        let evtTest = `test`
        eventFn(function(this: any, evt: any) {
            expect(evt).not.toBeUndefined()
            expect(evt).toEqual(evtTest)
            done()
        }).call(undefined, evtTest)
    })
})
