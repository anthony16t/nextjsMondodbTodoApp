import { ObjectId } from 'mongodb'
const mongodb = require('../../../modules/mongodb')

const db = new mongodb('mongodbTodo')

export default async function handler(req, res) {
    await db.connect()
    db.setCollection('todoList')
    if(req.method==='POST'){
        let id =  req.body.body.id
        if(await db.findOneById(id)){
            await db.deleteOne({_id:ObjectId(id)})
            res.status(200).json({status:'ok',msg:`Todo was delete`})
        }else{
            res.status(200).json({status:'bad',msg:'Todo was not found'})
        }
    }else{
        res.status(200).json({status:'bad',msg:'Only post allow'})
    }
}