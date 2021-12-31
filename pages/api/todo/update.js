import { ObjectId } from 'mongodb'
const mongodb = require('../../../modules/mongodb')

const db = new mongodb('mongodbTodo')

export default async function handler(req, res) {
    await db.connect()
    db.setCollection('todoList')
    if(req.method==='POST'){
        let id =  req.body.body.id
        let status =  req.body.body.status
        if(await db.findOneById(id)){
            await db.updateOne({_id:ObjectId(id)},{status:status})
            res.status(200).json({status:'ok',msg:`Todo was update`})
        }else{
            res.status(200).json({status:'bad',msg:'Todo was not found'})
        }
    }else{
        res.status(200).json({status:'bad',msg:'Only post allow'})
    }
}