<?php
declare(strict_types=1);

// UselessFacts SDK base feature

class UselessFactsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(UselessFactsContext $ctx, array $options): void {}
    public function PostConstruct(UselessFactsContext $ctx): void {}
    public function PostConstructEntity(UselessFactsContext $ctx): void {}
    public function SetData(UselessFactsContext $ctx): void {}
    public function GetData(UselessFactsContext $ctx): void {}
    public function GetMatch(UselessFactsContext $ctx): void {}
    public function SetMatch(UselessFactsContext $ctx): void {}
    public function PrePoint(UselessFactsContext $ctx): void {}
    public function PreSpec(UselessFactsContext $ctx): void {}
    public function PreRequest(UselessFactsContext $ctx): void {}
    public function PreResponse(UselessFactsContext $ctx): void {}
    public function PreResult(UselessFactsContext $ctx): void {}
    public function PreDone(UselessFactsContext $ctx): void {}
    public function PreUnexpected(UselessFactsContext $ctx): void {}
}
