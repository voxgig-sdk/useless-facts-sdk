-- Typed models for the UselessFacts SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Random
---@field id? string
---@field language? string
---@field permalink? string
---@field source? string
---@field source_url? string
---@field text? string

---@class RandomLoadMatch
---@field language? string

---@class Today
---@field id? string
---@field language? string
---@field permalink? string
---@field source? string
---@field source_url? string
---@field text? string

---@class TodayLoadMatch
---@field language? string

local M = {}

return M
