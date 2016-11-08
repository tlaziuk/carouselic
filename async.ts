export function promiseFn<T extends any, R extends any>(fn: (this: T, ...arg: any[]) => R, thisVar?: T, ...arg: any[]): Promise<R> {
    return new Promise<R>((resolve: (value?: R | PromiseLike<R>) => void, reject: (reason?: any) => void) => {
        requestAnimationFrame(() => {
            try {
                resolve(fn.apply(thisVar, arg))
            } catch (error) {
                reject(error)
            }
        })
    })
}

export function eventFn<T extends HTMLElement, E extends Event>(fn: (this: T, evt: E, ...arg: any[]) => any, ...arg: any[]): (this: T, evt: E) => void {
    return function(this: T, evt: E) {
        requestAnimationFrame(fn.bind(this, evt, ...arg))
    }
}
