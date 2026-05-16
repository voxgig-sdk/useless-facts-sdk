<?php
declare(strict_types=1);

// UselessFacts SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UselessFactsMakeContext
{
    public static function call(array $ctxmap, ?UselessFactsContext $basectx): UselessFactsContext
    {
        return new UselessFactsContext($ctxmap, $basectx);
    }
}
