# Typed models for the UselessFacts SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Random:
    id: Optional[str] = None
    language: Optional[str] = None
    permalink: Optional[str] = None
    source: Optional[str] = None
    source_url: Optional[str] = None
    text: Optional[str] = None


@dataclass
class RandomLoadMatch:
    id: Optional[str] = None
    language: Optional[str] = None
    permalink: Optional[str] = None
    source: Optional[str] = None
    source_url: Optional[str] = None
    text: Optional[str] = None


@dataclass
class Today:
    id: Optional[str] = None
    language: Optional[str] = None
    permalink: Optional[str] = None
    source: Optional[str] = None
    source_url: Optional[str] = None
    text: Optional[str] = None


@dataclass
class TodayLoadMatch:
    id: Optional[str] = None
    language: Optional[str] = None
    permalink: Optional[str] = None
    source: Optional[str] = None
    source_url: Optional[str] = None
    text: Optional[str] = None

