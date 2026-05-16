# UselessFacts SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module UselessFactsFeatures
  def self.make_feature(name)
    case name
    when "base"
      UselessFactsBaseFeature.new
    when "test"
      UselessFactsTestFeature.new
    else
      UselessFactsBaseFeature.new
    end
  end
end
