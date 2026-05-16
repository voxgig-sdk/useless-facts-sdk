<?php
declare(strict_types=1);

// UselessFacts SDK utility: feature_add

class UselessFactsFeatureAdd
{
    public static function call(UselessFactsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
