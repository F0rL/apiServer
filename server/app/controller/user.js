const { Op } = require('sequelize')
const { User } = require('@app/model/User')

class UserController {
  static async getUserById(uid) {
    const result = await User.findOne({
      where: {
        id: uid
      }
    })
    return result
  }
}


module.exports = UserController