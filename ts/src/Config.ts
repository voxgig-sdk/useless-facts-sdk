
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'UselessFacts',
        slug: "useless-facts",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://uselessfacts.jsph.pl",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      random: {
      },

      today: {
      },

    }
  }


  entity = {
    "random": {
      "fields": [
        {
          "name": "id",
          "short": "Unique identifier for the fact",
          "type": "`$STRING`"
        },
        {
          "name": "language",
          "short": "Language code of the fact",
          "type": "`$STRING`"
        },
        {
          "name": "permalink",
          "short": "Permanent link to the fact",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "short": "Source of the fact",
          "type": "`$STRING`"
        },
        {
          "name": "source_url",
          "short": "URL to the fact source",
          "type": "`$STRING`"
        },
        {
          "name": "text",
          "short": "The useless fact text",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "language",
                    "orig": "language",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v2/facts/random",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v2"
                },
                {
                  "lit": "facts"
                },
                {
                  "lit": "random"
                }
              ],
              "select": {
                "exist": [
                  "accept",
                  "language"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "v2",
                "facts",
                "random"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "today": {
      "fields": [
        {
          "name": "id",
          "short": "Unique identifier for the fact",
          "type": "`$STRING`"
        },
        {
          "name": "language",
          "short": "Language code of the fact",
          "type": "`$STRING`"
        },
        {
          "name": "permalink",
          "short": "Permanent link to the fact",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "short": "Source of the fact",
          "type": "`$STRING`"
        },
        {
          "name": "source_url",
          "short": "URL to the fact source",
          "type": "`$STRING`"
        },
        {
          "name": "text",
          "short": "The useless fact text",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "language",
                    "orig": "language",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v2/facts/today",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v2"
                },
                {
                  "lit": "facts"
                },
                {
                  "lit": "today"
                }
              ],
              "select": {
                "exist": [
                  "accept",
                  "language"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "v2",
                "facts",
                "today"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

