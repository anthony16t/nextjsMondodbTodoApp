const mongodb = require('../../../modules/mongodb')

const db = new mongodb('mongodbTodo')

export default async function handler(req, res) {
    await db.connect()
    db.setCollection('todoList')
    if(req.method==='GET'){
        let result = await db.findMany().sort({_id:-1}).toArray()
        res.status(200).json(result)
    }else if(req.method==='POST'){
        let name =  req.body.body.name.toLowerCase()
        let status =  req.body.body.status 
        if(await db.findOne({name:name})){
            res.status(200).json({status:'bad',msg:`Todo:${name} already exists`})
        }else{
            await db.insertOne({name:name,status:status})
            res.status(200).json({status:'ok',msg:'Todo was added'})
        }
    }
}