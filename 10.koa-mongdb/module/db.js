let  {MongoClient}=require('mongodb')
let config=require('./config')

exports.mongodb=function(){
    new Promise((resolve,reject)=>{
        try{
            
        }catch(err){
            reject(err)
        }
    })
}


class Db{
    constructor(){
        this.dbClient=""
        this.connect()
    }
    static getInstance(){
        if(!Db.instance){
            Db.instance=new Db()
        }
        return Db.instance
    }
    connect(){
        return new Promise((resolve,reject)=>{
            if(!this.dbClient){
                MongoClient.connect(config.dbUrl,(err,client)=>{
                    if(err) reject(err)
                    this.dbClient=client.db(config.dbName)
                    resolve(this.dbClient)
                })
            }else{
                resolve(this.dbClient)
            }
        })
    }
    find(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).find(json).toArray((err,data)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(data)
                    }
                })
            })
        })
    }
    insert(collectionName,item){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).insertOne(item,(err,data)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(data)
                    }
                })
            })
        })
    }
    update(collectionName,item1,item){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).updateOne(item1,item,(err,data)=>{
                    if(err){
                        reject(err)
                    }else{
                        console.log(data)
                        resolve(data)
                    }
                })
            })
        })
    }
    remove(collectionName,item){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).remove(item,(err,data)=>{
                    if(err){
                        reject(err)
                    }else{
                        console.log(data)
                        resolve(data)
                    }
                })
            })
        })
    }
    close(){
        this.dbClient.close()
    }
}

module.exports=Db.getInstance()

// let myDb=Db.getInstance()

// console.time('start')
// myDb.find('dataList',{}).then((data)=>{
//     console.log(data)
//     console.timeEnd('start')
// })


// setTimeout(()=>{
//     console.time('start2')
//     myDb.find('dataList',{}).then((data)=>{
//         // console.log(data)
//         console.timeEnd('start2')
//     })
// },3000)

// myDb.insert('dataList',{name:123123})



// setTimeout(()=>{
//     let myDb2=Db.getInstance()
//     console.time('start3')
//     myDb2.find('dataList',{}).then((data)=>{
//         // console.log(data)
//         console.timeEnd('start3')
//     })
// },3000)