const { Op } = require('sequelize')
const { Blog } = require('@app/model/Blog')

class BlogController {
  static async getBlogList() {
    const result = await Blog.findAll({
      where: {
        status: 2
      },
      attributes: { exclude: ['created_at', 'deleted_at'] },
      order: [['updated_at', 'DESC']]
    })
    return result
  }
}


module.exports = BlogController