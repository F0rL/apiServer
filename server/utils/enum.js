function isLoginType(val) {
  for(let key in this) {
    if(this[key] === parseInt(val)){
      return true
    }
  }
  return false
}

// login  type
const loginType = {
  // 小程序登录
  USER_MIN_PROGRAM: 100,
  // 邮箱登录
  USER_EAMIL: 101,
  // 手机登录
  USER_MOBILE: 102,
  // 管理员邮箱登录
  ADMIN_EAMIL: 200,
  isLoginType
}

module.exports = {
  loginType
}