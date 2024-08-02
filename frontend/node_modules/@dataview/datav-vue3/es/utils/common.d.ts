import type { Point } from '../types/common';
import type { Plugin } from 'vue';
import type { PropType } from 'vue';
export declare function withInstall<T>(comp: T): T & Plugin;
export declare const definePropType: <T>(val: any) => PropType<T>;
/**
 * @description 计算两点之间距离
 * @param {Point[]} pointA point1
 * @param {Point[]} pointB point2
 * @return {number[]}
 */
export declare const calcTwoPointDistance: (pointA: Point, pointB: Point) => number;
export declare function mergeColor(defaultColors: string[], colors?: string[]): string[];
