<?php
declare(strict_types=1);

// UselessFacts SDK utility: prepare_body

class UselessFactsPrepareBody
{
    public static function call(UselessFactsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
