-- UselessFacts SDK error

local UselessFactsError = {}
UselessFactsError.__index = UselessFactsError


function UselessFactsError.new(code, msg, ctx)
  local self = setmetatable({}, UselessFactsError)
  self.is_sdk_error = true
  self.sdk = "UselessFacts"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function UselessFactsError:error()
  return self.msg
end


function UselessFactsError:__tostring()
  return self.msg
end


return UselessFactsError
