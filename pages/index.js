import axios from 'axios';
import Head from 'next/head'
import { useLayoutEffect, useRef, useState } from 'react'
import Nav from '../components/Nav';
import NewTodo from '../components/NewTodo';
import Todo from '../components/Todo';
import { Context } from '../components/Context';

export default function Home({todoList,domainUrl}) {
  let todoAppDiv = useRef()
  let [themeColor,setThemeColor] = useState(null)
  let [myTodoList,setMyTodoList] = useState(todoList)
  useLayoutEffect(()=>{
    let theme_color = localStorage.getItem('themeColor')
    if(!theme_color){ localStorage.setItem('themeColor','light')}
    setThemeColor(theme_color)
  },[])
  const ContextValues = {
    themeColor,setThemeColor,myTodoList,setMyTodoList,domainUrl
  }
  return (
    <Context.Provider value={ContextValues}>
    <div className={`mdbTodo ${themeColor!==null?themeColor:''}`} ref={todoAppDiv}>
      <Head>
        <title>Mongodb TodoApp | Anthony16t</title>
        <meta name="description" content="A todo app with dark mode using next js and mongodb." />
        <link rel="icon" type="image/png" href="/favicon.png" />        
      </Head>
      <Nav/>
      <div className="todoList">
        {myTodoList.map(todo=><Todo domainUrl={domainUrl} key={todo._id} id={todo._id} isDone={todo.status==='done'?true:false}
        name={todo.name} myTodoList={myTodoList} setMyTodoList={setMyTodoList} />)}
      </div>
      <NewTodo/>
    </div>
    </Context.Provider>
  )
}

export async function getServerSideProps(){
  const domainUrl = process.env.NODE_ENV==='development'?'http://localhost:3000/':'https://nextjs-mondodb-todo-app.vercel.app/'
  const fetchReq = await axios.get(`${domainUrl}api/todo`)
  const todoList = await fetchReq.data
  return {
    props:{todoList:todoList,domainUrl:domainUrl}
  }
}

