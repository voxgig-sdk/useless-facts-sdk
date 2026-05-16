# UselessFacts SDK utility: make_context

from core.context import UselessFactsContext


def make_context_util(ctxmap, basectx):
    return UselessFactsContext(ctxmap, basectx)
