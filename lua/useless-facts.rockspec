package = "voxgig-sdk-useless-facts"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/useless-facts-sdk.git",
  tag = "lua/v0.0.1",
  dir = "useless-facts-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Useless Facts public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/useless-facts-sdk",
  issues_url = "https://github.com/voxgig-sdk/useless-facts-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "useless-facts" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["useless-facts_sdk"] = "useless-facts_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
