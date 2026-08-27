-- UselessFacts SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "UselessFacts",
      slug = "useless-facts",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://uselessfacts.jsph.pl",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["random"] = {},
        ["today"] = {},
      },
    },
    entity = {
      ["random"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the fact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "language",
            ["short"] = "Language code of the fact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "permalink",
            ["short"] = "Permanent link to the fact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source",
            ["short"] = "Source of the fact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source_url",
            ["short"] = "URL to the fact source",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "text",
            ["short"] = "The useless fact text",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "random",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["header"] = {
                    {
                      ["example"] = "application/json",
                      ["kind"] = "header",
                      ["name"] = "accept",
                      ["orig"] = "accept",
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "language",
                      ["orig"] = "language",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v2/facts/random",
                ["parts"] = {
                  "api",
                  "v2",
                  "facts",
                  "random",
                },
                ["select"] = {
                  ["exist"] = {
                    "accept",
                    "language",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["today"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the fact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "language",
            ["short"] = "Language code of the fact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "permalink",
            ["short"] = "Permanent link to the fact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source",
            ["short"] = "Source of the fact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source_url",
            ["short"] = "URL to the fact source",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "text",
            ["short"] = "The useless fact text",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "today",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["header"] = {
                    {
                      ["example"] = "application/json",
                      ["kind"] = "header",
                      ["name"] = "accept",
                      ["orig"] = "accept",
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "language",
                      ["orig"] = "language",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v2/facts/today",
                ["parts"] = {
                  "api",
                  "v2",
                  "facts",
                  "today",
                },
                ["select"] = {
                  ["exist"] = {
                    "accept",
                    "language",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
