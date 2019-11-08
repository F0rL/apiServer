require('module-alias/register')
const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const InitManager = require('./core/initManager')
const  catchError = require('./middleware/catchError')

const app = new koa()

app.use(bodyParser())
app.use(cors())
app.proxy=true

// 处理错误
app.use(catchError)
// init router
InitManager.initCore(app)

const port  = process.env.NODE_ENV === 'development' ? 3000 : 3003
app.listen(3000, () => {
  console.log(`server is running on port ${port}`)
})