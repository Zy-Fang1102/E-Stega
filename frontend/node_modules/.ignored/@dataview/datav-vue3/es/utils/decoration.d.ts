export declare function createColorProps(): {
    color: {
        type: import("vue").PropType<[string, string]>;
        default: () => any[];
    };
};
export declare function createReverseProps(): {
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare function createDurationProps(duration: number): {
    duration: {
        type: NumberConstructor;
        default: number;
    };
};
