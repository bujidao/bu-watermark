interface BuWatermarkMoreOptions extends Object {
    angle: number;
    fontColor: string;
    opacity: number | string;
    zIndex: number;
    fontSize: string;
    fontFamily: string;
}
interface BuWatermarkOptions extends Object {
    target: string;
    text: string | number | Array<string>;
    options: BuWatermarkMoreOptions;
}
declare class BuWatermark {
    target: any;
    text: string | number | Array<string>;
    options: BuWatermarkMoreOptions;
    watermarkDom: any;
    watermarkObserver: any;
    constructor(options: BuWatermarkOptions);
    validateOptions(options: BuWatermarkOptions): void;
    init(): void;
    createCanvas(): any;
    createContainer(src: string): any;
    render(dom: any): void;
    observer(): void;
    remove(): void;
}
