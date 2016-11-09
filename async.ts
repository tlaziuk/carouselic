export function eventFn<T extends HTMLElement, E extends Event>(fn: (this: T, evt: E, ...arg: any[]) => any, ...arg: any[]): (this: T, evt: E) => void {
    return function(this: T, evt: E) {
        requestAnimationFrame(fn.bind(this, evt, ...arg))
    }
}
