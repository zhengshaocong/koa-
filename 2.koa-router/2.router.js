const Koa=require('koa')

const app=new Koa()

const router=require('koa-router')();//注意引入的方式
 
router.get('/',(ctx)=>{
    ctx.body='首页'
    // console.log(ctx.query)
    // console.log(ctx.querystring)
    console.log(ctx.request)
})

router.get('/news/:id',(ctx)=>{
    ctx.body='新闻详情'
    console.log(ctx.query)
    console.log(ctx.params)
    // console.log(ctx.querystring)
    // console.log(ctx.request)
})

//启动路由
app.use(router.routes())//启动路由
   .use(router.allowedMethods())//若你没有配置响应头  这里会给与配置对应响应头

app.listen(3001)