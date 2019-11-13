const Router = require('koa-router')
const jwt = require('jsonwebtoken')

const loginType = require('@root/utils/enum')
const { config } = require('@app/config/config')
const UserController = require('@app/controller/user')
const { ParameterException } = require('@root/core/httpCode')
const { User } = require('@app/model/User')

const { Auth } = require('@root/middleware/auth')

const router = new Router({
  prefix: '/homepage/token'
})

// 登录返回token
router.post('/', async (ctx, next) => {
  const v = ctx.body
  if (!v.type) {
    throw new Error('type是必选参数')
  }
  if (!loginType.isLoginType(v.type)) {
    throw new Error('type参数不合法')
  }
  switch (parseInt(v.type)) {
    case loginType.USER_EAMIL:
      token = await emailLogin(v.account, v.secret)
      break
    case loginType.USER_MOBILE:
      token = await mobileLogin(v.account, v.secret)
    default:
      throw new ParameterException('未找到相应处理方法')
      break
  }
  ctx.body = {
    token
  }
})

async function emailLogin(account, secret) {
  const user = await User.emailLogin(account, secret)
  return
}

// 验证token
router.get('/verify', new Auth().u, async ctx => {
  const uid = ctx.auth.uid
  const scope = ctx.auth.scope
  ctx.body = {
    code: 200,
    uid,
    scope
  }
})

// token 获取用户信息
router.post('/user', async ctx => {
  const token = ctx.request.body.token
  if (!token) {
    ctx.body = {
      code: 404,
      msg: '未传递token'
    }
    return
  }
  try {
    const v = jwt.verify(token, config.security.secretKey)
    console.log(v);
    const userInfo = await UserController.getUserById(v.uid)
    ctx.body = {
      code: 200,
      userInfo
    }
  } catch (error) {
    console.log(error);
  }
})

module.exports = router
