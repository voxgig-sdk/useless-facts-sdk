
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UselessFactsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await UselessFactsSDK.test()
    equal(null !== testsdk, true)
  })

})
