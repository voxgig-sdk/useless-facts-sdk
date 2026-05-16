
import { Context } from './Context'


class UselessFactsError extends Error {

  isUselessFactsError = true

  sdk = 'UselessFacts'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  UselessFactsError
}

