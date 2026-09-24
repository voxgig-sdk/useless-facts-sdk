# UselessFacts SDK configuration

module UselessFactsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "UselessFacts",
        "slug" => "useless-facts",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://uselessfacts.jsph.pl",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "random" => {},
          "today" => {},
        },
      },
      "entity" => {
        "random" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "Unique identifier for the fact",
            },
            {
              "name" => "language",
              "title" => "Language",
              "type" => "`$STRING`",
              "short" => "Language code of the fact",
            },
            {
              "name" => "permalink",
              "title" => "Permalink",
              "type" => "`$STRING`",
              "short" => "Permanent link to the fact",
            },
            {
              "name" => "source",
              "title" => "Source",
              "type" => "`$STRING`",
              "short" => "Source of the fact",
            },
            {
              "name" => "source_url",
              "title" => "Source Url",
              "type" => "`$STRING`",
              "short" => "URL to the fact source",
            },
            {
              "name" => "text",
              "title" => "Text",
              "type" => "`$STRING`",
              "short" => "The useless fact text",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "random",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v2/facts/random",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "facts",
                    },
                    {
                      "lit" => "random",
                    },
                  ],
                  "parts" => [
                    "api",
                    "v2",
                    "facts",
                    "random",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "header" => [
                      {
                        "name" => "accept",
                        "orig" => "accept",
                        "type" => "`$STRING`",
                        "kind" => "header",
                        "example" => "application/json",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "language",
                        "orig" => "language",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "accept",
                      "language",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "today" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "Unique identifier for the fact",
            },
            {
              "name" => "language",
              "title" => "Language",
              "type" => "`$STRING`",
              "short" => "Language code of the fact",
            },
            {
              "name" => "permalink",
              "title" => "Permalink",
              "type" => "`$STRING`",
              "short" => "Permanent link to the fact",
            },
            {
              "name" => "source",
              "title" => "Source",
              "type" => "`$STRING`",
              "short" => "Source of the fact",
            },
            {
              "name" => "source_url",
              "title" => "Source Url",
              "type" => "`$STRING`",
              "short" => "URL to the fact source",
            },
            {
              "name" => "text",
              "title" => "Text",
              "type" => "`$STRING`",
              "short" => "The useless fact text",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "today",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v2/facts/today",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "facts",
                    },
                    {
                      "lit" => "today",
                    },
                  ],
                  "parts" => [
                    "api",
                    "v2",
                    "facts",
                    "today",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "header" => [
                      {
                        "name" => "accept",
                        "orig" => "accept",
                        "type" => "`$STRING`",
                        "kind" => "header",
                        "example" => "application/json",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "language",
                        "orig" => "language",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "accept",
                      "language",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    UselessFactsFeatures.make_feature(name)
  end
end
