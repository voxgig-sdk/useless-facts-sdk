package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "UselessFacts",
			"slug": "useless-facts",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://uselessfacts.jsph.pl",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"random": map[string]any{},
				"today": map[string]any{},
			},
		},
		"entity": map[string]any{
			"random": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"short": "Language code of the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "permalink",
						"short": "Permanent link to the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"short": "Source of the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_url",
						"short": "URL to the fact source",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "text",
						"short": "The useless fact text",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "random",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"example": "application/json",
											"kind": "header",
											"name": "accept",
											"orig": "accept",
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "language",
											"orig": "language",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v2/facts/random",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "facts",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"accept",
										"language",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v2",
									"facts",
									"random",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"today": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"short": "Language code of the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "permalink",
						"short": "Permanent link to the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"short": "Source of the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_url",
						"short": "URL to the fact source",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "text",
						"short": "The useless fact text",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "today",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"example": "application/json",
											"kind": "header",
											"name": "accept",
											"orig": "accept",
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "language",
											"orig": "language",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v2/facts/today",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "facts",
									},
									map[string]any{
										"lit": "today",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"accept",
										"language",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"v2",
									"facts",
									"today",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
