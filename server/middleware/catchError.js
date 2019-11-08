const { HttpException } = require('../core/httpCode')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = process.env.NODE_ENV === 'development'
    if (isDev && !isHttpException) {
      throw error
    }
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method}${ctx.path}`
      }
      ctx.status = error.code
    } else {
      //未知异常
      ctx.body = {
        msg: 'something unkown error',
        error_code: 999,
        request: `${ctx.method}${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
