package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/useless-facts-sdk/go"
	"github.com/voxgig-sdk/useless-facts-sdk/go/core"

	vs "github.com/voxgig-sdk/useless-facts-sdk/go/utility/struct"
)

func TestTodayEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Today(nil)
		if ent == nil {
			t.Fatal("expected non-nil TodayEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := todayBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "today." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set USELESSFACTS_TEST_TODAY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		todayRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.today", setup.data)))
		var todayRef01Data map[string]any
		if len(todayRef01DataRaw) > 0 {
			todayRef01Data = core.ToMapAny(todayRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = todayRef01Data

		// LOAD
		todayRef01Ent := client.Today(nil)
		todayRef01MatchDt0 := map[string]any{
			"id": todayRef01Data["id"],
		}
		todayRef01DataDt0Loaded, err := todayRef01Ent.Load(todayRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		todayRef01DataDt0LoadResult := core.ToMapAny(todayRef01DataDt0Loaded)
		if todayRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if todayRef01DataDt0LoadResult["id"] != todayRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func todayBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "today", "TodayTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read today test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse today test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"today01", "today02", "today03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("USELESSFACTS_TEST_TODAY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"USELESSFACTS_TEST_TODAY_ENTID": idmap,
		"USELESSFACTS_TEST_LIVE":      "FALSE",
		"USELESSFACTS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["USELESSFACTS_TEST_TODAY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["USELESSFACTS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewUselessFactsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["USELESSFACTS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["USELESSFACTS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
