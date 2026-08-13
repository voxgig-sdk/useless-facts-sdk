# Today entity test

require "minitest/autorun"
require "json"
require_relative "../UselessFacts_sdk"
require_relative "runner"

class TodayEntityTest < Minitest::Test
  def test_create_instance
    testsdk = UselessFactsSDK.test(nil, nil)
    ent = testsdk.Today(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = today_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "today." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set USELESS_FACTS_TEST_TODAY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    today_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.today")))
    today_ref01_data = nil
    if today_ref01_data_raw.length > 0
      today_ref01_data = Helpers.to_map(today_ref01_data_raw[0][1])
    end

    # LOAD
    today_ref01_ent = client.Today(nil)
    today_ref01_match_dt0 = {
      "id" => today_ref01_data["id"],
    }
    today_ref01_data_dt0_loaded = today_ref01_ent.load(today_ref01_match_dt0, nil)
    today_ref01_data_dt0_load_result = Helpers.to_map(today_ref01_data_dt0_loaded.respond_to?(:data_get) ? today_ref01_data_dt0_loaded.data_get : today_ref01_data_dt0_loaded)
    assert !today_ref01_data_dt0_load_result.nil?
    assert_equal today_ref01_data_dt0_load_result["id"], today_ref01_data["id"]

  end
end

def today_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "today", "TodayTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = UselessFactsSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["today01", "today02", "today03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["USELESS_FACTS_TEST_TODAY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "USELESS_FACTS_TEST_TODAY_ENTID" => idmap,
    "USELESS_FACTS_TEST_LIVE" => "FALSE",
    "USELESS_FACTS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["USELESS_FACTS_TEST_TODAY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["USELESS_FACTS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = UselessFactsSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["USELESS_FACTS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["USELESS_FACTS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
