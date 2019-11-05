const Router = require('koa-router')
const { hpStaticDomain } = require('@app/config/hpConfig')

const router = new Router({
  prefix: '/homepage/static'
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

module.exports = router
