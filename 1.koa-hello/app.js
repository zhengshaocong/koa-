const Koa=require('koa')

const app=new Koa()

app.use(async(ctx)=>{
    ctx.body='你好koa'
})

app.listen(3001)