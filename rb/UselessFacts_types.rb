# frozen_string_literal: true

# Typed models for the UselessFacts SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Random entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] permalink
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
Random = Struct.new(
  :id,
  :language,
  :permalink,
  :source,
  :source_url,
  :text,
  keyword_init: true
)

# Match filter for Random#load (any subset of Random fields).
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] permalink
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
RandomLoadMatch = Struct.new(
  :id,
  :language,
  :permalink,
  :source,
  :source_url,
  :text,
  keyword_init: true
)

# Today entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] permalink
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
Today = Struct.new(
  :id,
  :language,
  :permalink,
  :source,
  :source_url,
  :text,
  keyword_init: true
)

# Match filter for Today#load (any subset of Today fields).
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] permalink
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
TodayLoadMatch = Struct.new(
  :id,
  :language,
  :permalink,
  :source,
  :source_url,
  :text,
  keyword_init: true
)

