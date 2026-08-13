# UselessFacts SDK utility: make_context

from projectname_sdk.core.context import UselessFactsContext


def make_context_util(ctxmap, basectx):
    return UselessFactsContext(ctxmap, basectx)
