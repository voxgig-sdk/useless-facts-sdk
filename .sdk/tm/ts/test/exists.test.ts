
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UselessFactsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = UselessFactsSDK.test()
    equal(testsdk instanceof UselessFactsSDK, true,
      'UselessFactsSDK.test() must return a client synchronously')
  })

})
