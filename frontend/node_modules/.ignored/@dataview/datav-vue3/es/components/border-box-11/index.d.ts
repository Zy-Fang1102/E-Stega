declare const createBorderBox11Props: () => {
    titleWidth: {
        type: NumberConstructor;
        default: number;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: import("vue").PropType<[string, string]>;
        default: () => any[];
    };
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
};
export declare type BorderBox11Props = ReturnType<typeof createBorderBox11Props>;
export declare const BorderBox11: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            title: string;
            color: [string, string];
            backgroundColor: string;
            titleWidth: number;
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
            titleWidth: {
                type: NumberConstructor;
                default: number;
            };
            title: {
                type: StringConstructor;
                default: string;
            };
            color: {
                type: import("vue").PropType<[string, string]>;
                default: () => any[];
            };
            backgroundColor: {
                type: StringConstructor;
                default: string;
            };
        }>> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "title" | "color" | "backgroundColor" | "titleWidth">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}>;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}>;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            titleWidth: {
                type: NumberConstructor;
                default: number;
            };
            title: {
                type: StringConstructor;
                default: string;
            };
            color: {
                type: import("vue").PropType<[string, string]>;
                default: () => any[];
            };
            backgroundColor: {
                type: StringConstructor;
                default: string;
            };
        }>>, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
            title: string;
            color: [string, string];
            backgroundColor: string;
            titleWidth: number;
        }, {}, string> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}>, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}>, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: import("vue").WatchOptions<boolean>): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
        titleWidth: {
            type: NumberConstructor;
            default: number;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        color: {
            type: import("vue").PropType<[string, string]>;
            default: () => any[];
        };
        backgroundColor: {
            type: StringConstructor;
            default: string;
        };
    }>> & import("vue").ShallowUnwrapRef<() => JSX.Element> & {} & import("vue").ComponentCustomProperties & {};
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    titleWidth: {
        type: NumberConstructor;
        default: number;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: import("vue").PropType<[string, string]>;
        default: () => any[];
    };
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
}>>, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    title: string;
    color: [string, string];
    backgroundColor: string;
    titleWidth: number;
}, {}, string> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & import("@vue/runtime-core").Plugin;
export {};
