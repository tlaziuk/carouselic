export function each<T extends any, R extends any, A extends any>(collection: A[], fn: (this: T, arg: A) => R, thisVar?: T): R[] {
    let result: R[] = []
    for (let i of collection)
        result.push(fn.call(thisVar, i))
    return result
}
