const Router = require('koa-router')

const { Blog } = require('@app/model/Blog')
const { Auth } = require('@root/middleware/auth')
const { Success, AuthFailed } = require('@root/core/httpCode')
const { ParameterException } = require('@root/core/httpCode')
const BlogController = require('@app/controller/blog')
const UserController = require('@app/controller/user')

const router = new Router({
  prefix: '/homepage/blog'
})

// POST
// 新增草稿
// 参数：token=>uid 可选publishId
router.post('/drafts/new', new Auth().u, async (ctx, next) => {
  const uid = ctx.auth.uid
  const publishId = ctx.request.body.publishId || null
  const blog = {
    authorId: uid,
    status: 1, //未发布
    publishId
  }
  const msg = await Blog.create(blog)
  ctx.body = {
    code: 200,
    msg
  }
})

// POST
// 用户输入同时更新草稿
// 参数：token=>uid title content blogId
router.post('/drafts/update', new Auth().u, async (ctx, next) => {
  const uid = ctx.auth.uid
  const v = ctx.request.body
  const title = v.title || '空白标题'
  const content = v.content || ''
  const blogId = v.blogId || 0
  const msg = await Blog.update(
    {
      title,
      content
    },
    {
      where: {
        author_id: uid,
        id: blogId
      }
    }
  )
  // 更新不成功
  if (msg[0] === 0) {
    throw new Success('未找到对应文章')
  }
  ctx.body = {
    code: 200,
    msg
  }
})

// POST
// 用户点击发布新增文章
// 如果文章是已经发布的，则还要删除已发布文章
// 参数：token=>uid blogId title content
router.post('/publish', new Auth().u, async (ctx, next) => {
  const uid = ctx.auth.uid
  const v = ctx.request.body
  const draftId = v.blogId
  const blog = {
    title: v.title,
    content: v.content,
    authorId: uid,
    status: 2 //已发布
  }
  const msg = await Blog.create(blog)
  const del = await Blog.destroy({
    force: false,
    where: {
      authorId: uid,
      id: draftId
    }
  })
  ctx.body = {
    code: 200,
    msg,
    del
  }
})

// GET
// 获取所有已发布文章列表
router.get('/bloglist', async (ctx, next) => {
  const blogList = await BlogController.getBlogList()
  const addNickNameList = []
  for(value of blogList) {
    const user = await UserController.getUserById(value.authorId)
    // 只获取里面的JSON数据
    value = value.get({plain: true})
    addNickNameList.push({...value, nickname: user.nickname })
  }
  ctx.body = {
    code: 200,
    blogList: addNickNameList
  }
})

// GET
// 获取用户已发布的文章列表
// 参数：token=>uid
router.get('/artical/list', new Auth().u, async (ctx, next) => {
  const id = ctx.auth.uid
  const userBlogList = await Blog.findAll({
    where: {
      author_id: id,
      status: 2
    },
    order: [['updated_at', 'DESC']]
  })
  ctx.body = {
    code: 200,
    userBlogList
  }
})

// GET
// 获取用户自己的未发布文章列表
// 参数：token=>uid
router.get('/drafts/list', new Auth().u, async (ctx, next) => {
  const id = ctx.auth.uid
  const blogList = await Blog.findAll({
    where: {
      author_id: id,
      status: 1
    },
    order: [['updated_at', 'DESC']]
  })
  ctx.body = {
    code: 200,
    blogList
  }
})

// GET
// 获取指定已发布文章内容
// 参数 blogId
router.get('/artical', async (ctx, next) => {
  const blogId = ctx.request.query.blogId
  const content = await Blog.findOne({
    where: {
      id: blogId,
      status: 2
    }
  })
  if (!content) {
    throw new Success('未找到指定文章')
  }
  ctx.body = {
    code: 200,
    content
  }
})

// GET
// 获取指定草稿文章内容
// 参数：token=>uid
router.get('/drafts', new Auth().u, async (ctx, next) => {
  const blogId = ctx.request.query.blogId
  const uid = ctx.auth.uid
  const content = await Blog.findOne({
    where: {
      authorId: uid,
      id: blogId,
      status: 1
    }
  })
  if (!content) {
    throw new Success('未找到指定文章')
  }
  ctx.body = {
    code: 200,
    content
  }
})

// POST
// 删除博客
// 软删除
router.post('/delete', new Auth().u, async (ctx, next) => {
  const v = ctx.request.body
  const uid = ctx.auth.uid
  const blogId = v.blogId
  const blog = await Blog.destroy({
    force: false,
    where: {
      author_id: uid,
      id: blogId
    }
  })

  ctx.body = {
    code: 200,
    blog
  }
})

module.exports = router
