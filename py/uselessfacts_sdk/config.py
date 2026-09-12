# UselessFacts SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "UselessFacts",
            "slug": "useless-facts",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://uselessfacts.jsph.pl",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "random": {},
                "today": {},
            },
        },
        "entity": {
      "random": {
        "fields": [
          {
            "name": "id",
            "short": "Unique identifier for the fact",
            "type": "`$STRING`",
          },
          {
            "name": "language",
            "short": "Language code of the fact",
            "type": "`$STRING`",
          },
          {
            "name": "permalink",
            "short": "Permanent link to the fact",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "short": "Source of the fact",
            "type": "`$STRING`",
          },
          {
            "name": "source_url",
            "short": "URL to the fact source",
            "type": "`$STRING`",
          },
          {
            "name": "text",
            "short": "The useless fact text",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "random",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "example": "application/json",
                      "kind": "header",
                      "name": "accept",
                      "orig": "accept",
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "language",
                      "orig": "language",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v2/facts/random",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v2",
                  },
                  {
                    "lit": "facts",
                  },
                  {
                    "lit": "random",
                  },
                ],
                "select": {
                  "exist": [
                    "accept",
                    "language",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v2",
                  "facts",
                  "random",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "today": {
        "fields": [
          {
            "name": "id",
            "short": "Unique identifier for the fact",
            "type": "`$STRING`",
          },
          {
            "name": "language",
            "short": "Language code of the fact",
            "type": "`$STRING`",
          },
          {
            "name": "permalink",
            "short": "Permanent link to the fact",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "short": "Source of the fact",
            "type": "`$STRING`",
          },
          {
            "name": "source_url",
            "short": "URL to the fact source",
            "type": "`$STRING`",
          },
          {
            "name": "text",
            "short": "The useless fact text",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "today",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "example": "application/json",
                      "kind": "header",
                      "name": "accept",
                      "orig": "accept",
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "language",
                      "orig": "language",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v2/facts/today",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v2",
                  },
                  {
                    "lit": "facts",
                  },
                  {
                    "lit": "today",
                  },
                ],
                "select": {
                  "exist": [
                    "accept",
                    "language",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "v2",
                  "facts",
                  "today",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
