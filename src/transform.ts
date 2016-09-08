export interface TranslateInterface {
    x?: number
    y?: number
}

export function translate({x = 0, y = 0, }: TranslateInterface = {}) {
    return `translate(${x}px,${y}px)`
}
