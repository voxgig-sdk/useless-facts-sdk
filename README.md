# UselessFacts SDK

Fetch random or daily useless facts in English or German via a tiny, no-auth HTTP API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Useless Facts API

The Useless Facts API is a small, free HTTP service that serves random useless facts. It is run as a personal, non-commercial project by [jsph.pl](https://uselessfacts.jsph.pl).

What you get from the API:
- A random useless fact via `GET /api/v2/facts/random`
- The fact of the day via `GET /api/v2/facts/today`
- Language selection (English or German) via the `?language=en` or `?language=de` query parameter
- Choice of response format (`application/json` or `text/plain`) selected through the `Accept` header

Operational notes: the API requires no authentication and CORS is enabled, so it can be called directly from browsers. The legacy v1 endpoints are deprecated and now return `308` redirects to the v2 paths above; clients should follow and cache those redirects.

## Try it

**TypeScript**
```bash
npm install useless-facts
```

**Python**
```bash
pip install useless-facts-sdk
```

**PHP**
```bash
composer require voxgig/useless-facts-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/useless-facts-sdk/go
```

**Ruby**
```bash
gem install useless-facts-sdk
```

**Lua**
```bash
luarocks install useless-facts-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { UselessFactsSDK } from 'useless-facts'

const client = new UselessFactsSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o useless-facts-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "useless-facts": {
      "command": "/abs/path/to/useless-facts-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Random** | A randomly selected useless fact, served from `GET /api/v2/facts/random` and optionally localised via `?language=en|de`. | `/api/v2/facts/random` |
| **Today** | The useless fact of the day, served from `GET /api/v2/facts/today` with the same language query parameter. | `/api/v2/facts/today` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from uselessfacts_sdk import UselessFactsSDK

client = UselessFactsSDK({})


# Load a specific random
random, err = client.Random(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'uselessfacts_sdk.php';

$client = new UselessFactsSDK([]);


// Load a specific random
[$random, $err] = $client->Random(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/useless-facts-sdk/go"

client := sdk.NewUselessFactsSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "UselessFacts_sdk"

client = UselessFactsSDK.new({})


# Load a specific random
random, err = client.Random(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("useless-facts_sdk")

local client = sdk.new({})


-- Load a specific random
local random, err = client:Random(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = UselessFactsSDK.test()
const result = await client.Random().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = UselessFactsSDK.test(None, None)
result, err = client.Random(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = UselessFactsSDK::test(null, null);
[$result, $err] = $client->Random(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Random(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = UselessFactsSDK.test(nil, nil)
result, err = client.Random(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Random(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Useless Facts API

- Upstream: [https://uselessfacts.jsph.pl](https://uselessfacts.jsph.pl)

---

Generated from the Useless Facts API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
