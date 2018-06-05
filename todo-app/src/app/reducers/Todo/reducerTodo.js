import {
    K_TODO_ADD, 
    K_TODO_DELETE, 
    K_TODO_CHANGE_STATUS,
    K_TODO_GET_SUCCESS
} from '../../constants/constantTodo';

import {
    K_SHOW_ACTIVE
} from '../../constants/constantFilter'

export const initialState = [];

export default function reducerTodo(state = initialState, action) {
    switch(action.type){
        case K_TODO_GET_SUCCESS:
          return action.payload;

        case K_TODO_ADD:
            return [...state, {id: action.index, text: action.text, status: K_SHOW_ACTIVE}];

        case K_TODO_DELETE:
            return state.filter(todo => todo.id !== action.index);

        case K_TODO_CHANGE_STATUS:
            return state.map(todo => {
                    if (todo.id === action.index) {
                        return Object.assign({}, todo, {status: action.status})
                    } 

                    return todo;
                });

        default:
            return state;
    }

}