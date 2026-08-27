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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "short" => "Unique identifier for the fact",
              "type" => "`$STRING`",
            },
            {
              "name" => "language",
              "short" => "Language code of the fact",
              "type" => "`$STRING`",
            },
            {
              "name" => "permalink",
              "short" => "Permanent link to the fact",
              "type" => "`$STRING`",
            },
            {
              "name" => "source",
              "short" => "Source of the fact",
              "type" => "`$STRING`",
            },
            {
              "name" => "source_url",
              "short" => "URL to the fact source",
              "type" => "`$STRING`",
            },
            {
              "name" => "text",
              "short" => "The useless fact text",
              "type" => "`$STRING`",
            },
          ],
          "name" => "random",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "example" => "application/json",
                        "kind" => "header",
                        "name" => "accept",
                        "orig" => "accept",
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "en",
                        "kind" => "query",
                        "name" => "language",
                        "orig" => "language",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v2/facts/random",
                  "parts" => [
                    "api",
                    "v2",
                    "facts",
                    "random",
                  ],
                  "select" => {
                    "exist" => [
                      "accept",
                      "language",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
              "short" => "Unique identifier for the fact",
              "type" => "`$STRING`",
            },
            {
              "name" => "language",
              "short" => "Language code of the fact",
              "type" => "`$STRING`",
            },
            {
              "name" => "permalink",
              "short" => "Permanent link to the fact",
              "type" => "`$STRING`",
            },
            {
              "name" => "source",
              "short" => "Source of the fact",
              "type" => "`$STRING`",
            },
            {
              "name" => "source_url",
              "short" => "URL to the fact source",
              "type" => "`$STRING`",
            },
            {
              "name" => "text",
              "short" => "The useless fact text",
              "type" => "`$STRING`",
            },
          ],
          "name" => "today",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "example" => "application/json",
                        "kind" => "header",
                        "name" => "accept",
                        "orig" => "accept",
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "en",
                        "kind" => "query",
                        "name" => "language",
                        "orig" => "language",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v2/facts/today",
                  "parts" => [
                    "api",
                    "v2",
                    "facts",
                    "today",
                  ],
                  "select" => {
                    "exist" => [
                      "accept",
                      "language",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
