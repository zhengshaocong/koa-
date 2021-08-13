
//koa中间件会优先匹配use



const Koa=require('koa')

const app=new Koa()

const Router=require('koa-router');//注意引入的方式

const router=new Router()

const views=require('koa-views')

const { resolve }=require('path')
//在匹配路由前会走中间件


//模板公共信息

app.use(async(ctx,next)=>{
    ctx.state.userinfo='张三'
    await next()
})

//模板引擎 ejs
//views 参数1：模板文件的位置  参数二 配置项
app.use(views(resolve(__dirname,'./views') ,{
    extension:'ejs'//应用ejs模板引擎
}))


// //配置ejs引擎应用html文件
// app.use(views( 'views',{map:{html:'ejs'}}))


router.get('/',async (ctx)=>{
     await ctx.render('index.ejs',{
         title:'66666'
     })//在配置好模板引擎后 直接输入文件名 会自动到模板文件夹里找对应文件 注意：不带后缀默认html
})


// router.get('/',(ctx)=>{
//     ctx.render('index.html')//在配置好模板引擎后 直接输入文件名 会自动到模板文件夹里找对应文件 注意：不带后缀默认html
// })


//ctx 代表上下文 包含了 request 和 response 等
router.get('/news',(ctx)=>{
    ctx.body='新闻列表'
}).get('/list',(ctx)=>{
    ctx.body='列表'
})


//中间件之间的执行顺序，若在执行next的时候是使用 async的方式会遵循堆栈式的推进方式
//但若是在next并没有使用async时则会优先执行未使用async的中间件 相当堵塞了

//错误中间件
app.use(async (ctx,next)=>{
    await next()//next相当于接下来的中间件和路由 在执行完next后 再往下走404页面
    console.log('错误中间件')//先走这里
    if(ctx.status===404){
        ctx.status=404
        ctx.body='404页面'
    }else{
        console.log(ctx.url)
    }
})


//启动路由
app.use(router.routes())//启动路由
   .use(router.allowedMethods())//若你没有配置响应头  这里会给与配置对应响应头

app.listen(3001)