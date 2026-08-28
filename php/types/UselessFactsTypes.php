<?php
declare(strict_types=1);

// Typed models for the UselessFacts SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Random entity data model. */
class Random
{
    public ?string $id = null;
    public ?string $language = null;
    public ?string $permalink = null;
    public ?string $source = null;
    public ?string $source_url = null;
    public ?string $text = null;
}

/** Request payload for Random#load. */
class RandomLoadMatch
{
    public ?string $language = null;
}

/** Today entity data model. */
class Today
{
    public ?string $id = null;
    public ?string $language = null;
    public ?string $permalink = null;
    public ?string $source = null;
    public ?string $source_url = null;
    public ?string $text = null;
}

/** Request payload for Today#load. */
class TodayLoadMatch
{
    public ?string $language = null;
}

