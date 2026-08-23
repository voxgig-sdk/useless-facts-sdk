<?php
declare(strict_types=1);

// UselessFacts SDK configuration

class UselessFactsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "UselessFacts",
                "slug" => "useless-facts",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://uselessfacts.jsph.pl",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "random" => [],
                    "today" => [],
                ],
            ],
            "entity" => [
        'random' => [
          'fields' => [
            [
              'name' => 'id',
              'short' => 'Unique identifier for the fact',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'language',
              'short' => 'Language code of the fact',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'permalink',
              'short' => 'Permanent link to the fact',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'short' => 'Source of the fact',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source_url',
              'short' => 'URL to the fact source',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'text',
              'short' => 'The useless fact text',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'random',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'header' => [
                      [
                        'example' => 'application/json',
                        'kind' => 'header',
                        'name' => 'accept',
                        'orig' => 'accept',
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'language',
                        'orig' => 'language',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v2/facts/random',
                  'parts' => [
                    'api',
                    'v2',
                    'facts',
                    'random',
                  ],
                  'select' => [
                    'exist' => [
                      'accept',
                      'language',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'today' => [
          'fields' => [
            [
              'name' => 'id',
              'short' => 'Unique identifier for the fact',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'language',
              'short' => 'Language code of the fact',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'permalink',
              'short' => 'Permanent link to the fact',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'short' => 'Source of the fact',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source_url',
              'short' => 'URL to the fact source',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'text',
              'short' => 'The useless fact text',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'today',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'header' => [
                      [
                        'example' => 'application/json',
                        'kind' => 'header',
                        'name' => 'accept',
                        'orig' => 'accept',
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'language',
                        'orig' => 'language',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v2/facts/today',
                  'parts' => [
                    'api',
                    'v2',
                    'facts',
                    'today',
                  ],
                  'select' => [
                    'exist' => [
                      'accept',
                      'language',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return UselessFactsFeatures::make_feature($name);
    }
}
