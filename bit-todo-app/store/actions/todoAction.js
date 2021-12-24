import { CLEAR_SEARCH,DELETE_TODO, CREATE_TODO, GET_TODOS, SET_LOADING, SET_ERROR, EDIT_TODO, CREATE_NEW_TODO, SEARCH_BY_TITLE } from "../keys";
import apiTodo from "../../apis/apiTodo"

export function getTodos(payload) {
  return {
    type: GET_TODOS,
    payload
  }
}

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload
  }
}

export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}


export function createNewTodo(payload) {
  return {
    type: CREATE_TODO,
    payload,
  };
}

export function deleteTodo(payload) {
  return {
    type: DELETE_TODO,
    payload,
  };
}

export function editTodo(payload) {
  return {
    type: EDIT_TODO,
    payload,
  };
}

export function searchByTitle(payload) {
  return {
    type: SEARCH_BY_TITLE,
    payload,
  };
}

export function clearAllSearch() {
  return {
    type: CLEAR_SEARCH,
  };
}


export function fetchTodos() {
  return async function (dispatch) {
    dispatch(setLoading(true))
    try {
      const { data } = await apiTodo({
        method: 'GET',
        url: '/todos'
      })
      data.forEach((item)=> {
        item.description = "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
      })
      // console.log(data);
      const todosSorting = data.sort((a, b) => b.id - a.id);
      dispatch(getTodos(todosSorting))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err.response);
      dispatch(setError(err.response))
    }
  }
} 