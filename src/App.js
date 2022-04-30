import React, {useEffect, useState} from 'react'
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {getOneId, postTask, getTask, deleteTodo, editTask, doneTodo} from "./redux/reducers/todo";


function App() {

    const todos = useSelector((store) => store.todo.todos);
    const dispatch = useDispatch()


    const [text, setText] = useState('')
    const [search,setSearch] = useState('')

    const searchTask = (e) => {
        e.preventDefault()
        setSearch(e.target[0].value)
    }

    useEffect(()=>{
        dispatch(getTask())
    },[])

    return (
        <div className="App">
            <div>

                <button type="button" onClick={()=> dispatch(getOneId(1))}>Получить айди</button>
                <input value={text} type="text" onChange={(e) => setText(e.target.value)}/>
                    <button type="button" onClick={()=> {
                        dispatch(postTask(text))
                        dispatch(getTask())
                        setText('')
                    }}>Добавить</button>
            </div>
            <ul>
                {todos.filter((el)=> el.title.startsWith(search)).map((item)=>(
                    <li style={{color : item.important ? 'red' : 'black',textDecoration : item.done ? 'line-through' : 'none'}} key={item.id}>{item.title}
                    <button onClick={()=> {
                        dispatch(deleteTodo(item.id,item.title))
                        dispatch(getTask())
                    }} style={{margin : '0 10px'}} type="button">delete</button>
                        <button type="button" onClick={()=> {
                        dispatch(editTask(item.id,item.important))
                            dispatch(getTask())
                        }}>Important</button>
                        <button style={{margin : '0 10px'}} type="button" onClick={()=> {
                        dispatch(doneTodo(item.id,item.done))
                            dispatch(getTask())
                        }}>Done</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={searchTask}>
                <input type="search"/>
                <button type="submit">Найти</button>
            </form>
        </div>
    );
}

export default App
