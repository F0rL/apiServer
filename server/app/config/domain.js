let apiDomain, staticDomain

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  // 后台
  apiDomain = 'http://localhost:3000'
  // 静态资源nginx
  // staticDomain = 'http://localhost:4000'
  staticDomain = 'http://static.forl.fun'
  // 模拟获取ip，此为本机ip
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
