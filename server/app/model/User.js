const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('@root/core/db')
const { Forbbiden } = require('../../core/httpCode')

class User extends Model {
  static async verifyEmailOrPhone(account, plainPassword, type = 101) {
    const typeObj = {
      101: 'email',
      102: 'phone'
    }
    if (!typeObj[type]) {
      throw new Forbbiden('登录方式错误')
    }
    const user = await User.findOne({
      where: {
        [typeObj[type]]: account
      }
    })
    if (!user) {
      throw new Forbbiden('用户不存在')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new Forbbiden('密码错误')
    }
    return user
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: Sequelize.STRING,
    phone: {
      type: Sequelize.BIGINT,
      unique: true
    },
    email: {
      type: Sequelize.STRING(128),
      //唯一
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      }
    },
    // 为微信留置
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  { sequelize, tableName: 'user' }
)

module.exports = {
  User
}
