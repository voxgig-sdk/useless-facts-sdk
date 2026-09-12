import { UselessFactsEntityBase } from '../UselessFactsEntityBase';
import type { UselessFactsSDK } from '../UselessFactsSDK';
import type { Control } from '../types';
import type { Random, RandomLoadMatch } from '../UselessFactsTypes';
declare class RandomEntity extends UselessFactsEntityBase<Random> {
    constructor(client: UselessFactsSDK, entopts: any);
    make(this: RandomEntity): RandomEntity;
    load(this: any, reqmatch?: RandomLoadMatch, ctrl?: Control): Promise<RandomEntity>;
}
export { RandomEntity };
