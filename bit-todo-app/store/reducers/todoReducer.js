import { CLEAR_SEARCH, DELETE_TODO ,CREATE_TODO, GET_TODOS, SET_ERROR, SET_LOADING, EDIT_TODO, SEARCH_BY_TITLE } from "../keys";

const initialState = {
  todos: [],
  todosOrigin: [],
  isError: null,
  isLoading: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TODOS:
      return { ...state, todos: payload, todosOrigin: payload };
    case SET_ERROR:
      return { ...state, isError: payload };
    case SET_LOADING:
      return { ...state, isLoading: payload };
    case CREATE_TODO:
      let newTodos = state.todosOrigin.map(el => el);
      newTodos.unshift(payload);
      return { ...state, todos: newTodos, todosOrigin: newTodos };
    case DELETE_TODO:
      let deleteTodo = state.todosOrigin.filter(el => el.id !== payload)
      return { ...state, todos: deleteTodo, todosOrigin: deleteTodo }
    case EDIT_TODO:
      let editTodo = state.todosOrigin.filter(el => el.id !== payload.id)
      editTodo.unshift(payload)
      return { ...state, todos: editTodo, todosOrigin: editTodo }
    case SEARCH_BY_TITLE:
      let resultByTitle = [];
      let title = state.todos
      title.forEach((list) => {
        if (list.title.toLocaleLowerCase().search(payload.toLocaleLowerCase()) > -1) {
          resultByTitle.push(list);
        }
      });
      return { ...state, todos: resultByTitle }
    case CLEAR_SEARCH:
      return { ...state, todos: state.todosOrigin }
    default:
      return state;
  }
}
