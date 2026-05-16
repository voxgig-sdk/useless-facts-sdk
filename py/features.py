# UselessFacts SDK feature factory

from feature.base_feature import UselessFactsBaseFeature
from feature.test_feature import UselessFactsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: UselessFactsBaseFeature(),
        "test": lambda: UselessFactsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
