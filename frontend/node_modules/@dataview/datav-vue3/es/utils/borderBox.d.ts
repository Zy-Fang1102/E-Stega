export declare function createBorderBoxCommonProps(): {
    color: {
        type: import("vue").PropType<[string, string]>;
        default: () => any[];
    };
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
};
export declare type BorderBoxCommonProps = ReturnType<typeof createBorderBoxCommonProps>;
export declare function mergeColor(defaultColors: string[], colors?: string[]): string[];
