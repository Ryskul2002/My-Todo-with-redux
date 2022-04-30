import axios from "axios";



let GET = 'GET'
let GET_ONE = 'GET_ONE'
const initialState = {
    todos : [],
    alone: {}
}


export default (state = initialState,action) => {
    switch (action.type) {
        case GET : {
            return {
                ...state,
                todos: action.arr
            }
        }
        case GET_ONE : {
            return {
                ...state,
                alone: action.task
            }
        }
        default : return state
    }
}

export const getTask = () => {
    return (dispatch) => {
        axios('http://localhost:8080/todos?_start=1&_end=10')
            .then(({data})=> {
                return dispatch({type: GET,arr:data})
            })
    }
}

export const getOneId = (id) => {
    return (dispatch) => {
        axios(`http://localhost:8080/todos/${id}`)
            .then(({data})=> {
                return dispatch({type:GET_ONE,task: data})
            })
    }
}

export const postTask = (text) => {
    return () => {
        axios.post('http://localhost:8080/todos',{
            title : text,
            done : false,
            change : false,
            important : false,
            id : Math.round(Math.random() * 10000)
        }).then(({data})=> alert(`Ваша задача ${data.title} добавлена!`))
    }
}

export const deleteTodo = (id,title) => {
    return () => {
        axios.delete(`http://localhost:8080/todos/${id}`)
            .then(({data})=> alert(`Ваша задача ${title} удалена!`))
    }
}

export const editTask = (id,important) => {
    return () => {
        axios.patch(`http://localhost:8080/todos/${id}`,{
            important : !important
        }).then(({data})=> alert(`Ваша задача ${data.title} теперь важная!`))
    }
}

export const doneTodo = (id,done) => {
    return () => {
        axios.patch(`http://localhost:8080/todos/${id}`,{
            done : !done
        })
            .then(({data})=> console.log('privet'))
    }
}