const Koa=require('koa')

const app=new Koa()

const Router=require('koa-router');//注意引入的方式

const router=new Router()

// app.use(async(ctx)=>{
//     ctx.body='你好koa'
// })

//ctx 代表上下文 包含了 request 和 response 等
router.get('/',(ctx)=>{
    ctx.body='首页'
}).get('/news',(ctx)=>{
    ctx.body='新闻列表'
})

//启动路由
app.use(router.routes())//启动路由
   .use(router.allowedMethods())//若你没有配置响应头  这里会给与配置对应响应头

app.listen(3001)