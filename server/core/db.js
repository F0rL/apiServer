// 数据库初始化文件
const { Sequelize } = require('sequelize')
const { config } = require('@app/config/config')

const { dbName, host, port, user, password } = config.database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  // 参数为函数或者false，默认为console.log
  logging: console.log,
  timezone: '+08:00',
  define: {
    // 时间戳
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    //字段以下划线（_）来分割（默认是驼峰命名风格）
    underscored: true
  }
})

sequelize.sync({
  // true强制删除数据库再重建
  force: false
})

module.exports = {
  sequelize
}
