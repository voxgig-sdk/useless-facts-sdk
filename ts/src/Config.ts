
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
      }
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
              "parts": [
                "api",
                "v2",
                "facts",
                "random"
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
              }
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
              "parts": [
                "api",
                "v2",
                "facts",
                "today"
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
              }
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
  config
}

