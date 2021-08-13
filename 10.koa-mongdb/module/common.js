
exports.getPostData=function(ctx){
    return new Promise((resove,reject)=>{
        try{
            let str=''
            ctx.req.on('data',(chunk)=>{
                str+=chunk
            })

            ctx.req.on('end',(chunk)=>{
                resove(str)
            })
        }catch(err){
            reject(err)
        }
    })
}