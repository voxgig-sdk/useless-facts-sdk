<?php
declare(strict_types=1);

// UselessFacts SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class UselessFactsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new UselessFactsBaseFeature();
            case "test":
                return new UselessFactsTestFeature();
            default:
                return new UselessFactsBaseFeature();
        }
    }
}
