const Router = require('koa-router')
const { Op } = require('sequelize')
const { User } = require('@app/model/User')
const { generateToken } = require('@root/utils/setToken')
const { Auth } = require('@root/middleware/auth')

const router = new Router({
  prefix: '/user'
})

// POST
// 注册
// 必须账号密码昵称
router.post('/register', async (ctx, next) => {
  const v = ctx.request.body
  console.log(v)
  const user = {
    email: v.email,
    password: v.password,
    nickname: v.nickname
  }
  const msg = await User.create(user)
  const token = generateToken(msg.id, Auth.USER)
  ctx.body = {
    code: 200,
    token,
    msg
  }
})

// POST
// 登录
// 邮箱或者手机登录
// 预留第三方wx登录
// 参数 account(email, mobile) secret type
router.post('/login', async (ctx, next) => {
  const v = ctx.request.body
  const user = await User.verifyEmailOrPhone(
    v.account,
    v.password,
    parseInt(v.type)
  )
  const userInfo = await User.findOne({
    where: {
      [Op.or]: [{ email: v.account }, { phone: v.account }]
      // email: v.account
    }
  })
  const token = generateToken(userInfo.id, Auth.USER)
  ctx.body = {
    code: 200,
    user,
    token
  }
})

module.exports = router
