const Router = require('koa-router')
const { imgUrl } = require('@app/tools/home/helper')
const { devClientIp } = require('@app/config/domain')
const { getIpInfo, getWether, getBing } = require('@root/utils/hpUtils')
const { Success } = require('@root/core/httpCode')

const router = new Router({
  prefix: '/homepage/home'
})

router.get('/bg', async (ctx, next) => {
  let idx = 0,
    n = 6
  const bingUrl = await getBing(idx, n)
  if (bingUrl && bingUrl.length === n) {
    ctx.body = {
      imgUrl,
      bingUrl
    }
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

router.get('/morebg', async (ctx, next) => {
  const { idx, n } = ctx.query
  const bingUrl = await getBing(idx, n)
  ctx.body = {
    bingUrl
  }
})

module.exports = router
