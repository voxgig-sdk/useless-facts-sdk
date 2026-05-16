<?php
declare(strict_types=1);

// UselessFacts SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

UselessFactsUtility::setRegistrar(function (UselessFactsUtility $u): void {
    $u->clean = [UselessFactsClean::class, 'call'];
    $u->done = [UselessFactsDone::class, 'call'];
    $u->make_error = [UselessFactsMakeError::class, 'call'];
    $u->feature_add = [UselessFactsFeatureAdd::class, 'call'];
    $u->feature_hook = [UselessFactsFeatureHook::class, 'call'];
    $u->feature_init = [UselessFactsFeatureInit::class, 'call'];
    $u->fetcher = [UselessFactsFetcher::class, 'call'];
    $u->make_fetch_def = [UselessFactsMakeFetchDef::class, 'call'];
    $u->make_context = [UselessFactsMakeContext::class, 'call'];
    $u->make_options = [UselessFactsMakeOptions::class, 'call'];
    $u->make_request = [UselessFactsMakeRequest::class, 'call'];
    $u->make_response = [UselessFactsMakeResponse::class, 'call'];
    $u->make_result = [UselessFactsMakeResult::class, 'call'];
    $u->make_point = [UselessFactsMakePoint::class, 'call'];
    $u->make_spec = [UselessFactsMakeSpec::class, 'call'];
    $u->make_url = [UselessFactsMakeUrl::class, 'call'];
    $u->param = [UselessFactsParam::class, 'call'];
    $u->prepare_auth = [UselessFactsPrepareAuth::class, 'call'];
    $u->prepare_body = [UselessFactsPrepareBody::class, 'call'];
    $u->prepare_headers = [UselessFactsPrepareHeaders::class, 'call'];
    $u->prepare_method = [UselessFactsPrepareMethod::class, 'call'];
    $u->prepare_params = [UselessFactsPrepareParams::class, 'call'];
    $u->prepare_path = [UselessFactsPreparePath::class, 'call'];
    $u->prepare_query = [UselessFactsPrepareQuery::class, 'call'];
    $u->result_basic = [UselessFactsResultBasic::class, 'call'];
    $u->result_body = [UselessFactsResultBody::class, 'call'];
    $u->result_headers = [UselessFactsResultHeaders::class, 'call'];
    $u->transform_request = [UselessFactsTransformRequest::class, 'call'];
    $u->transform_response = [UselessFactsTransformResponse::class, 'call'];
});
