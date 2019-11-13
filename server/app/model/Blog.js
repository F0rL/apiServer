const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('@root/core/db')
const { Forbbiden, ParameterException } = require('../../core/httpCode')

class Blog extends Model {
  
}

Blog.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    authorId: Sequelize.INTEGER,
    title: {
      type: Sequelize.STRING(128)
    },
    content: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.INTEGER
    },
    publishId: Sequelize.INTEGER,
    keywords: {
      type: Sequelize.STRING(128)
    }
  },
  { sequelize, tableName: 'blog' }
)

module.exports = {
  Blog
}
