

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UselessFactsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('RandomEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when USELESS_FACTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('USELESS_FACTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UselessFactsSDK.test()
    const ent = testsdk.Random()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.USELESS_FACTS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'random.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"short":"Unique identifier for the fact","type":"`$STRING`","index$":0},{"active":true,"name":"language","req":false,"short":"Language code of the fact","type":"`$STRING`","index$":1},{"active":true,"name":"permalink","req":false,"short":"Permanent link to the fact","type":"`$STRING`","index$":2},{"active":true,"name":"source","req":false,"short":"Source of the fact","type":"`$STRING`","index$":3},{"active":true,"name":"source_url","req":false,"short":"URL to the fact source","type":"`$STRING`","index$":4},{"active":true,"name":"text","req":false,"short":"The useless fact text","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"random","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"header":[{"active":true,"example":"application/json","kind":"header","name":"accept","orig":"accept","reqd":false,"type":"`$STRING`"}],"query":[{"active":true,"example":"en","kind":"query","name":"language","orig":"language","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v2/facts/random","json":"{\"operationId\":\"getRandomFact\",\"parameters\":[{\"description\":\"Language code for the fact\",\"in\":\"query\",\"name\":\"language\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"en\",\"de\"],\"type\":\"string\"}},{\"description\":\"Response content type\",\"in\":\"header\",\"name\":\"Accept\",\"required\":false,\"schema\":{\"default\":\"application/json\",\"enum\":[\"application/json\",\"text/plain\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"Unique identifier for the fact\",\"type\":\"string\"},\"language\":{\"description\":\"Language code of the fact\",\"type\":\"string\"},\"permalink\":{\"description\":\"Permanent link to the fact\",\"type\":\"string\"},\"source\":{\"description\":\"Source of the fact\",\"type\":\"string\"},\"source_url\":{\"description\":\"URL to the fact source\",\"type\":\"string\"},\"text\":{\"description\":\"The useless fact text\",\"type\":\"string\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"description\":\"The useless fact as plain text\",\"type\":\"string\"}}},\"description\":\"Successful response with a random useless fact\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v2/facts/random","segments":[{"lit":"api"},{"lit":"v2"},{"lit":"facts"},{"lit":"random"}],"select":{"exist":["accept","language"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"random","name__orig":"random","Name":"Random","name_":"random","name-":"random","NAME":"RANDOM","index$":0}, {"active":true,"entity":"random","key$":"BasicRandomFlow","kind":"basic","name":"BasicRandomFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"random_ref01","srcdatavar":"random_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-random_ref01"}}],"index$":0}]}, 'Random')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let random_ref01_data = Object.values(setup.data.existing.random)[0] as any

    // LOAD
    const random_ref01_ent = client.Random()
    const random_ref01_match_dt0: any = {}
    random_ref01_match_dt0.id = random_ref01_data.id
    const random_ref01_data_dt0 = (await random_ref01_ent.load(random_ref01_match_dt0)).data()
    assert(random_ref01_data_dt0.id === random_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/random/RandomTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UselessFactsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['random01','random02','random03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'USELESS_FACTS_TEST_RANDOM_ENTID': idmap,
    'USELESS_FACTS_TEST_LIVE': 'FALSE',
    'USELESS_FACTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['USELESS_FACTS_TEST_RANDOM_ENTID']

  const live = 'TRUE' === env.USELESS_FACTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['USELESS_FACTS_TEST_RANDOM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UselessFactsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.USELESS_FACTS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
