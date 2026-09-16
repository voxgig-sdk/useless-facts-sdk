# UselessFacts SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UselessFactsFeatures
  def self.make_feature(name)
    case name
    when "base"
      UselessFactsBaseFeature.new
    when "ratelimit"
      UselessFactsRatelimitFeature.new
    when "retry"
      UselessFactsRetryFeature.new
    when "test"
      UselessFactsTestFeature.new
    when "timeout"
      UselessFactsTimeoutFeature.new
    else
      UselessFactsBaseFeature.new
    end
  end
end
