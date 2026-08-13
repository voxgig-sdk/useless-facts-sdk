# UselessFacts SDK exists test

import pytest
from uselessfacts_sdk import UselessFactsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UselessFactsSDK.test(None, None)
        assert testsdk is not None
