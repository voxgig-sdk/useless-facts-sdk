import { RandomEntity } from './entity/RandomEntity';
import { TodayEntity } from './entity/TodayEntity';
export type * from './UselessFactsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { UselessFactsEntityBase } from './UselessFactsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class UselessFactsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Random(entopts?: Record<string, any>): RandomEntity;
    Today(entopts?: Record<string, any>): TodayEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): UselessFactsSDK;
    tester(testopts?: any, sdkopts?: any): UselessFactsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof UselessFactsSDK;
export { stdutil, config, BaseFeature, UselessFactsEntityBase, UselessFactsSDK, SDK, };
