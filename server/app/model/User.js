const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('@root/core/db')

class User extends Model {

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
      type: Sequelize.INTEGER,
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
