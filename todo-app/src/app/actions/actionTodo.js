import {
    K_TODO_ADD, 
    K_TODO_DELETE, 
    K_TODO_CHANGE_STATUS,
    K_TODO_GET,
    K_TODO_GET_FAILED,
    K_TODO_GET_SUCCESS
} from '../constants/constantTodo';

  export function getTodo() {
    return async function (dispatch, getState) {
      try {
        const response = await fetch('http://localhost:3004/data');
        const json = await response.json();
        dispatch(getTodoSuccess(json));
      } catch(err) {
        dispatch(getTodoFailed(err));
      }
    }
  }

  export function postTodo(index,inputText) {
    return async function (dispatch, getState) {
      try {
        const response = await fetch('http://localhost:3004/data',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify ({
            id: index,
            text: inputText,
            status: 'STATUS_ACTIVE',
          })
        })
      } catch(err) {

      }
    }
  }
  
  export function getTodoSuccess(payload) {
    return {
      type: K_TODO_GET_SUCCESS,
      payload,
    }
  }
  
  export function getTodoFailed(error) {
    return {
      type: K_TODO_GET_SUCCESS,
      error,
    }
  }

export function addTodo(index,text){
    return {
        type: K_TODO_ADD,
        index,
        text
    }
}

export function deleteTodo(index){
    return {
        type: K_TODO_DELETE,
        index
    }
}

export function changeStatusTodo(index,status){
    return {
        type: K_TODO_CHANGE_STATUS,
        index,
        status
    }
}

