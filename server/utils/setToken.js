const jwt = require('jsonwebtoken')
const { config } = require('@app/config/config')
const { Auth } = require('@root/middleware/auth')

// 生成token
const generateToken = function(uid, scope) {
  const secretKey = config.security.secretKey
  const expiresIn = config.security.expiresIn
  console.log(secretKey, expiresIn)
  const token = jwt.sign(
    {
      uid,
      scope
    },
    secretKey,
    {
      expiresIn
    }
  )
  return token
}

module.exports = {
  generateToken
}
