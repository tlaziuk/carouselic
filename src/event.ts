export function event<T>(fn: (this: T, ...args: any[]) => any, thisVar?: T): (...args: any[]) => any {
    return (...args: any[]) => {
        requestAnimationFrame(fn.bind(thisVar, ...args))
    }
}
