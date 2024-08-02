/**
 * https://github.com/Microsoft/TypeScript/issues/29729
 */
export declare type LiteralUnion<T extends U, U> = T | (U & {});
export declare type Point = [number, number];
