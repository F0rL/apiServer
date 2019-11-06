let apiDomain, staticDomain

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  apiDomain = 'http://localhost:3000'
  staticDomain = 'http://localhost:4000'
  devClientIp = '115.175.217.236'
} else {
  apiDomain = 'http://api.forl.fun'
  staticDomain = 'http://static.forl.fun'
  devClientIp = null
}

module.exports = {
  apiDomain,
  staticDomain,
  devClientIp
}
