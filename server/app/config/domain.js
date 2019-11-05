let apiDomain, staticDomain

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  apiDomain = 'http://localhost:3000'
  staticDomain = 'http://localhost:4000'
} else {
  apiDomain = 'http://api.forl.fun'
  staticDomain = 'http://static.forl.fun'
}

module.exports = {
  apiDomain,
  staticDomain
}
