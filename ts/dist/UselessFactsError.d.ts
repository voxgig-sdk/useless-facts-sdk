import { Context } from './Context';
declare class UselessFactsError extends Error {
    isUselessFactsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { UselessFactsError };
