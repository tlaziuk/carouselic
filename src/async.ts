export function promiseFn<T extends any, R extends any>(fn: (this: T, ...arg: any[]) => R, thisVar: T, ...arg: any[]): Promise<R> {
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
