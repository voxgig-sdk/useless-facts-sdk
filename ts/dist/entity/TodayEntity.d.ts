import { UselessFactsEntityBase } from '../UselessFactsEntityBase';
import type { UselessFactsSDK } from '../UselessFactsSDK';
import type { Control } from '../types';
import type { Today, TodayLoadMatch } from '../UselessFactsTypes';
declare class TodayEntity extends UselessFactsEntityBase<Today> {
    constructor(client: UselessFactsSDK, entopts: any);
    make(this: TodayEntity): TodayEntity;
    load(this: any, reqmatch?: TodayLoadMatch, ctrl?: Control): Promise<TodayEntity>;
}
export { TodayEntity };
