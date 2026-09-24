

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TodayEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when USELESS_FACTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('USELESS_FACTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UselessFactsSDK.test()
    const ent = testsdk.Today()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.USELESS_FACTS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'today.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the fact","t":"`$STRING`","key$":"id","index$":0},"language":{"a":true,"h":"Language","n":"language","r":false,"sh":"Language code of the fact","t":"`$STRING`","key$":"language","index$":1},"permalink":{"a":true,"h":"Permalink","n":"permalink","r":false,"sh":"Permanent link to the fact","t":"`$STRING`","key$":"permalink","index$":2},"source":{"a":true,"h":"Source","n":"source","r":false,"sh":"Source of the fact","t":"`$STRING`","key$":"source","index$":3},"source_url":{"a":true,"h":"Source Url","n":"source_url","r":false,"sh":"URL to the fact source","t":"`$STRING`","key$":"source_url","index$":4},"text":{"a":true,"h":"Text","n":"text","r":false,"sh":"The useless fact text","t":"`$STRING`","key$":"text","index$":5}},"id":{"field":"id","name":"id"},"name":"today","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v2/facts/today","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"application/json","k":"header","n":"accept","or":"accept","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"en","k":"query","n":"language","or":"language","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v2/facts/today","q":{"exist":["accept","language"]},"r":{},"s":[{"lit":"api"},{"lit":"v2"},{"lit":"facts"},{"lit":"today"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"today","name__orig":"today","Name":"Today","name_":"today","name-":"today","NAME":"TODAY","index$":1}, {"active":true,"entity":"today","key$":"BasicTodayFlow","kind":"basic","name":"BasicTodayFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"today_ref01","srcdatavar":"today_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-today_ref01"}}],"index$":0}]}, 'Today', {"GET /api/v2/facts/today":{"protocol":"http","operationId":"getTodayFact","responses":{"200":{"description":"Successful response with today's useless fact","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Unique identifier for the fact","key$":"id","type":"string"},"text":{"description":"The useless fact text","key$":"text","type":"string"},"source":{"description":"Source of the fact","key$":"source","type":"string"},"source_url":{"description":"URL to the fact source","key$":"source_url","type":"string"},"language":{"description":"Language code of the fact","key$":"language","type":"string"},"permalink":{"description":"Permanent link to the fact","key$":"permalink","type":"string"}},"index$":0}},"text/plain":{"schema":{"type":"string","description":"The useless fact as plain text"}}}}},"parameters":[{"name":"language","in":"query","description":"Language code for the fact","required":false,"schema":{"type":"string","enum":["en","de"],"default":"en"},"index$":0},{"name":"Accept","in":"header","description":"Response content type","required":false,"schema":{"type":"string","enum":["application/json","text/plain"],"default":"application/json"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let today_ref01_data = Object.values(setup.data.existing.today)[0] as any

    // LOAD
    const today_ref01_ent = client.Today()
    const today_ref01_match_dt0: any = {}
    today_ref01_match_dt0.id = today_ref01_data.id
    const today_ref01_data_dt0 = (await today_ref01_ent.load(today_ref01_match_dt0)).data()
    assert(today_ref01_data_dt0.id === today_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/today/TodayTestData.json')

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
    ['today01','today02','today03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'USELESS_FACTS_TEST_TODAY_ENTID': idmap,
    'USELESS_FACTS_TEST_LIVE': 'FALSE',
    'USELESS_FACTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['USELESS_FACTS_TEST_TODAY_ENTID']

  const live = 'TRUE' === env.USELESS_FACTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['USELESS_FACTS_TEST_TODAY_ENTID']
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
  
