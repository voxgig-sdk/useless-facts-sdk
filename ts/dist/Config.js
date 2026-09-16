"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'UselessFacts',
        slug: "useless-facts",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://uselessfacts.jsph.pl",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            random: {},
            today: {},
        }
    };
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
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map