import axios from "axios";
import { useContext } from "react";
import { BsCheck, BsXLg } from "react-icons/bs";
import { Context } from "./Context";

export default function Todo({name,isDone,id,myTodoList,setMyTodoList}){
    const {domainUrl} = useContext(Context)
    async function handleDelete(e,id){
        let newTodoList = myTodoList.filter(todo=>todo._id!==id)
        await axios.post(`${domainUrl}api/todo/delete`,{
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
        await axios.post(`${domainUrl}api/todo/update`,{
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