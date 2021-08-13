
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

exports.isZhto64=function(isString){
    return Buffer.from(isString,'base64')
}

exports.is64toZh=function(data){
    return Buffer.allocUnsafe(data).toString()
}