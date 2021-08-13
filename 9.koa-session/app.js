
//koa中间件会优先匹配use



const Koa=require('koa')

const app=new Koa()

const Router=require('koa-router');//注意引入的方式

const router=new Router()

const views=require('koa-views')

const { resolve }=require('path')

const koaTemplate=require('koa-art-template')

const koaSession=require('koa-session');


//模板公共信息

app.use(async(ctx,next)=>{
    ctx.state.userinfo='张三'
    await next()
})


//配置 art-template模板引擎

koaTemplate(app,{
    root:resolve(__dirname,'views'),
    extname:'.html',//后缀名
    debug:process.env.NODE_ENV!=='production'
})


//session配置
app.keys=['some srcret hurr'] /*  cookie的签名  */
app.use(koaSession({
    key:'koa:sess',//存储在浏览器上的cookie的key
    maxAge:60*60*1000,//cookie有效时长
    overwrite:true,//是否覆盖
    httpOnly:true,//是否只有服务端可以访问
    rolling:false,//是否延长，每次访问时，刷新时长
    renew:false//是否自动续期 每次快过期时访问 刷新时长

},app))




router.get('/',async (ctx)=>{
     ctx.session.name='666666'//储存session
     await ctx.render('index',{
         title:'66666'
     })//在配置好模板引擎后 直接输入文件名 会自动到模板文件夹里找对应文件 注意：不带后缀默认html
})

router.get('/news',async (ctx)=>{
    let name=ctx.cookies.get('userinfor')
    await ctx.render('news',{
        name,
        title:'7777',
        dom:{
            h:'<h2>这是一个h2</h2>',
            num:10
        },
        list:[
            {name:'kkkk'},
            {name:'aaaa'},
            {name:'ccc'}
        ]
    })//在配置好模板引擎后 直接输入文件名 会自动到模板文件夹里找对应文件 注意：不带后缀默认html
})

router.get('/shop',async (ctx)=>{
    let name=ctx.session.name
    console.log(name)
    ctx.body='首页'
})



//中间件之间的执行顺序，若在执行next的时候是使用 async的方式会遵循堆栈式的推进方式
//但若是在next并没有使用async时则会优先执行未使用async的中间件 相当堵塞了

//错误中间件
app.use(async (ctx,next)=>{
    await next()//next相当于接下来的中间件和路由 在执行完next后 再往下走404页面
    if(ctx.status===404){
        console.log('错误中间件')//先走这里
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