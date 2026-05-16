<?php
declare(strict_types=1);

// UselessFacts SDK utility: result_body

class UselessFactsResultBody
{
    public static function call(UselessFactsContext $ctx): ?UselessFactsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
