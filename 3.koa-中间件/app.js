
//koa中间件会优先匹配use



const Koa=require('koa')

const app=new Koa()

const Router=require('koa-router');//注意引入的方式

const router=new Router()

//在匹配路由前会走中间件

//应用中间件 
app.use(async(ctx,next)=>{
    // ctx.body='这是一个中间件'
    console.log(1)
     next()//若没有next 则会中止  
    console.log(2)
})

//应用中间件 
app.use(async(ctx,next)=>{
    // ctx.body='这是一个中间件'
    console.log(3)
     next()//若没有next 则会中止
    console.log(4)
})

//应用中间件 
app.use(async(ctx,next)=>{
    // ctx.body='这是一个中间件'
    console.log(5)
    await next()//若没有next 则会中止
    console.log(6)
})


//中间件之间的执行顺序，若在执行next的时候是使用 async的方式会遵循堆栈式的推进方式
//但若是在next并没有使用async时则会优先执行未使用async的中间件 相当堵塞了

//错误中间件
app.use(async (ctx,next)=>{
    console.log('错误中间件')//先走这里
    next()//next相当于接下来的中间件和路由 在执行完next后 再往下走404页面
    if(ctx.status===404){
        ctx.status=404
        ctx.body='404页面'
    }else{
        console.log(ctx.url)
    }
})





//ctx 代表上下文 包含了 request 和 response 等
router.get('/',(ctx)=>{
    ctx.body='首页'
}).get('/news',(ctx)=>{
    ctx.body='新闻列表'
}).get('/list',(ctx)=>{
    ctx.body='列表'
})


//启动路由
app.use(router.routes())//启动路由
   .use(router.allowedMethods())//若你没有配置响应头  这里会给与配置对应响应头

app.listen(3001)