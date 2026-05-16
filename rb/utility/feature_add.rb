# UselessFacts SDK utility: feature_add
module UselessFactsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
