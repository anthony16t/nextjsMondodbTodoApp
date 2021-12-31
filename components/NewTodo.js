import axios from "axios";
import { useRef } from "react"
import { BsPlus } from "react-icons/bs";


export default function NewTodo({myTodoList,setMyTodoList}){
    const todoInputElement = useRef()
    const todoInputBox = useRef('')
    const inputValue = useRef('')
    const addTodoElement = useRef('')

    // open or close new todo box with input
    function handleNewTodoInput(e){
        let todoInputBoxIs = todoInputBox.current.classList.contains('open')?'open':'close'
        // open box if it is close
        if(todoInputBoxIs==='close'){
            todoInputBox.current.classList.add('open')
            addTodoElement.current.classList.add('open')
            todoInputElement.current.focus()

        }else{
            todoInputBox.current.classList.remove('open')
            addTodoElement.current.classList.remove('open')
            // clear input and reset input value
            todoInputElement.current.value=''
            inputValue.current=''
        }
    }
    // submit new todo
    async function handleNewTodoSubmit(e){
      // if return key was clicked submit and clear input value
        if(e.keyCode===13 && inputValue.current.trim().length>0){
            let newTodoReq = await axios.post('http://localhost:3000/api/todo',{
                body: { name: inputValue.current, status: 'pending' }
            })
            // if something goes wrong
            if(newTodoReq.data.status!=='ok'){
                alert(newTodoReq.data.msg) ; return
            }
            // update state
            setMyTodoList([{ name: inputValue.current, status: 'pending' },...myTodoList])
            // clear inputs
            todoInputElement.current.value=''
            inputValue.current=''
            todoInputBox.current.classList.remove('open')
            addTodoElement.current.classList.remove('open')
        }
    }
    
    return(
        <>
        <div className="newTodoInput" ref={todoInputBox}>
            <input ref={todoInputElement} type="text" placeholder='New todo'
            onChange={(e)=>inputValue.current=e.target.value}
            onKeyUp={handleNewTodoSubmit}
            />
        </div>
        <div className="addTodo" ref={addTodoElement}>
            <div className="addTodoIcon" onClick={handleNewTodoInput}>
                <BsPlus size="100%" />
            </div>
        </div>
        </>
    )
}