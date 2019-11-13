const { Op } = require('sequelize')
const { User } = require('@app/model/User')

class UserController {
  static async getUserById(uid) {
    const result = await User.findOne({
      where: {
        id: uid
      },
      attributes: { exclude: ['created_at', 'deleted_at', 'password'] },
    })
    return result
  }
}


module.exports = UserController