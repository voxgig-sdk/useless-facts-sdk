<?php
declare(strict_types=1);

// UselessFacts SDK utility: result_headers

class UselessFactsResultHeaders
{
    public static function call(UselessFactsContext $ctx): ?UselessFactsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
