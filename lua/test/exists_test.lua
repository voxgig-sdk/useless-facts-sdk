-- UselessFacts SDK exists test

local sdk = require("useless-facts_sdk")

describe("UselessFactsSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
