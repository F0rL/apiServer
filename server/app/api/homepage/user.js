const Router = require('koa-router')

const { User } = require('@app/model/User')
const { Success } = require('@root/core/httpCode')

const router = new Router({
  prefix: '/user'
})

// 注册
router.post('/register', async (ctx, next) => {
  const v = ctx.request.body
  console.log(v)
  const user = {
    email: v.email,
    password: v.password,
    nickname: v.nickname
  }
  const r = await User.create(user)
  throw new Success(user)
})

module.exports = router
