import axios from "axios";
import { BsCheck, BsXLg } from "react-icons/bs";

export default function Todo({name,isDone,id,myTodoList,setMyTodoList}){
    async function handleDelete(e,id){
        let newTodoList = myTodoList.filter(todo=>todo._id!==id)
        await axios.post('http://localhost:3000/api/todo/delete',{
            body:{
                id:id
            }
        })
        setMyTodoList(newTodoList)
    }
    async function handleStatusChange(e,id){
        let isActive = e.target.classList.contains('active')?true:false
        if(isActive){
            e.target.classList.remove('active')
        }else{
            e.target.classList.add('active')
        }
        await axios.post('http://localhost:3000/api/todo/update',{
            body:{
                id:id,
                status:isActive?'pending':'done'
            }
        })
    }
    return(
        <div className="todoListItem">
            <span className="todoListItemTitle">{name}</span>
            <BsXLg size="100%" className="deleteTodo" onClick={(e)=>handleDelete(e,id)} />
            <BsCheck size="100%" id={id} className={`todoListItemStatus ${isDone&&'active'}`} onClick={(e)=>handleStatusChange(e,id)}/>
        </div>
    )
}