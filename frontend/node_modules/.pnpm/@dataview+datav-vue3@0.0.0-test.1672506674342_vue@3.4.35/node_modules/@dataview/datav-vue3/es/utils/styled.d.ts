export declare function setClassPrefix(willSetPrefix: string): void;
export declare function getFullClassForBind(className: string): string;
export declare function styled<T>(StyledComponent: T): (style: TemplateStringsArray) => (className: string) => T;
export declare namespace styled {
    var span: (style: TemplateStringsArray) => (className: string) => (props: any, { slots }: {
        slots: any;
    }) => JSX.Element;
    var div: (style: TemplateStringsArray) => (className: string) => (props: any, { slots }: {
        slots: any;
    }) => JSX.Element;
    var img: (style: TemplateStringsArray) => (className: string) => (props: any) => JSX.Element;
    var svg: (style: TemplateStringsArray) => (className: string) => (props: any, { slots }: {
        slots: any;
    }) => JSX.Element;
}
