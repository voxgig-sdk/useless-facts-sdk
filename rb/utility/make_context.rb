# UselessFacts SDK utility: make_context
require_relative '../core/context'
module UselessFactsUtilities
  MakeContext = ->(ctxmap, basectx) {
    UselessFactsContext.new(ctxmap, basectx)
  }
end
