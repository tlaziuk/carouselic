import { Carousel } from './carousel'
export { Carousel }
export * from './orientation'
export * from './mode'
if (window) {
    (window as any)['Carouselic'] = Carousel
}
