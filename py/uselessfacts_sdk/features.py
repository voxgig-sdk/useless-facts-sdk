# UselessFacts SDK feature factory

from uselessfacts_sdk.feature.base_feature import UselessFactsBaseFeature
from uselessfacts_sdk.feature.test_feature import UselessFactsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: UselessFactsBaseFeature(),
        "test": lambda: UselessFactsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
