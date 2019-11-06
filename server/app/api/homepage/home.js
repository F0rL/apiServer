const Router = require('koa-router')
const { hpStaticDomain } = require('@app/config/hpConfig')
const { devClientIp } = require('@app/config/domain')
const { getIpInfo, getWether } = require('@root/utils/hpUtils')

const router = new Router({
  prefix: '/homepage/home'
})

router.get('/bg', async (ctx, next) => {
  ctx.body = {
    code: 200,
    imgUrl: [
      {
        id: 1,
        url: `${hpStaticDomain}/bg/BG_1.jpg`
      },
      {
        id: 2,
        url: `${hpStaticDomain}/bg/BG_2.jpg`
      }
    ]
  }
})

router.get('/getwether', async (ctx, next) => {
  const clientIP = devClientIp ? devClientIp : ctx.ip

  const ipInfo = await getIpInfo(clientIP)
  const wetherInfo = await getWether(ipInfo.data.adcode)
  ctx.body = {
    ...wetherInfo.data
  }
})

module.exports = router
