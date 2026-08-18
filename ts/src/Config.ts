
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


  main = {
    name: 'UselessFacts',
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
          "type": "`$STRING`"
        },
        {
          "name": "language",
          "type": "`$STRING`"
        },
        {
          "name": "permalink",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "type": "`$STRING`"
        },
        {
          "name": "source_url",
          "type": "`$STRING`"
        },
        {
          "name": "text",
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
          "type": "`$STRING`"
        },
        {
          "name": "language",
          "type": "`$STRING`"
        },
        {
          "name": "permalink",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "type": "`$STRING`"
        },
        {
          "name": "source_url",
          "type": "`$STRING`"
        },
        {
          "name": "text",
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

