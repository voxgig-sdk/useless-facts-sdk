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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the fact',
            ],
            [
              'name' => 'language',
              'title' => 'Language',
              'type' => '`$STRING`',
              'short' => 'Language code of the fact',
            ],
            [
              'name' => 'permalink',
              'title' => 'Permalink',
              'type' => '`$STRING`',
              'short' => 'Permanent link to the fact',
            ],
            [
              'name' => 'source',
              'title' => 'Source',
              'type' => '`$STRING`',
              'short' => 'Source of the fact',
            ],
            [
              'name' => 'source_url',
              'title' => 'Source Url',
              'type' => '`$STRING`',
              'short' => 'URL to the fact source',
            ],
            [
              'name' => 'text',
              'title' => 'Text',
              'type' => '`$STRING`',
              'short' => 'The useless fact text',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'random',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v2/facts/random',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'v2',
                    ],
                    [
                      'lit' => 'facts',
                    ],
                    [
                      'lit' => 'random',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'v2',
                    'facts',
                    'random',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'header' => [
                      [
                        'name' => 'accept',
                        'orig' => 'accept',
                        'type' => '`$STRING`',
                        'kind' => 'header',
                        'example' => 'application/json',
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'language',
                        'orig' => 'language',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'accept',
                      'language',
                    ],
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
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the fact',
            ],
            [
              'name' => 'language',
              'title' => 'Language',
              'type' => '`$STRING`',
              'short' => 'Language code of the fact',
            ],
            [
              'name' => 'permalink',
              'title' => 'Permalink',
              'type' => '`$STRING`',
              'short' => 'Permanent link to the fact',
            ],
            [
              'name' => 'source',
              'title' => 'Source',
              'type' => '`$STRING`',
              'short' => 'Source of the fact',
            ],
            [
              'name' => 'source_url',
              'title' => 'Source Url',
              'type' => '`$STRING`',
              'short' => 'URL to the fact source',
            ],
            [
              'name' => 'text',
              'title' => 'Text',
              'type' => '`$STRING`',
              'short' => 'The useless fact text',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'today',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v2/facts/today',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'v2',
                    ],
                    [
                      'lit' => 'facts',
                    ],
                    [
                      'lit' => 'today',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'v2',
                    'facts',
                    'today',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'header' => [
                      [
                        'name' => 'accept',
                        'orig' => 'accept',
                        'type' => '`$STRING`',
                        'kind' => 'header',
                        'example' => 'application/json',
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'language',
                        'orig' => 'language',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'accept',
                      'language',
                    ],
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
