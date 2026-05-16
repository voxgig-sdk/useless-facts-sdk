# UselessFacts SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

UselessFactsUtility.registrar = ->(u) {
  u.clean = UselessFactsUtilities::Clean
  u.done = UselessFactsUtilities::Done
  u.make_error = UselessFactsUtilities::MakeError
  u.feature_add = UselessFactsUtilities::FeatureAdd
  u.feature_hook = UselessFactsUtilities::FeatureHook
  u.feature_init = UselessFactsUtilities::FeatureInit
  u.fetcher = UselessFactsUtilities::Fetcher
  u.make_fetch_def = UselessFactsUtilities::MakeFetchDef
  u.make_context = UselessFactsUtilities::MakeContext
  u.make_options = UselessFactsUtilities::MakeOptions
  u.make_request = UselessFactsUtilities::MakeRequest
  u.make_response = UselessFactsUtilities::MakeResponse
  u.make_result = UselessFactsUtilities::MakeResult
  u.make_point = UselessFactsUtilities::MakePoint
  u.make_spec = UselessFactsUtilities::MakeSpec
  u.make_url = UselessFactsUtilities::MakeUrl
  u.param = UselessFactsUtilities::Param
  u.prepare_auth = UselessFactsUtilities::PrepareAuth
  u.prepare_body = UselessFactsUtilities::PrepareBody
  u.prepare_headers = UselessFactsUtilities::PrepareHeaders
  u.prepare_method = UselessFactsUtilities::PrepareMethod
  u.prepare_params = UselessFactsUtilities::PrepareParams
  u.prepare_path = UselessFactsUtilities::PreparePath
  u.prepare_query = UselessFactsUtilities::PrepareQuery
  u.result_basic = UselessFactsUtilities::ResultBasic
  u.result_body = UselessFactsUtilities::ResultBody
  u.result_headers = UselessFactsUtilities::ResultHeaders
  u.transform_request = UselessFactsUtilities::TransformRequest
  u.transform_response = UselessFactsUtilities::TransformResponse
}
