import {K_SHOW_ACTIVE,K_SHOW_COMPLETED} from '../constants/constantFilter'

export function getFilter(state) {
    return state.filter;
}

export function filterTodo(state) {
    const { data, filter} = state;

    switch(filter) {
        case K_SHOW_ACTIVE :
            return data.filter(todo => todo.status === K_SHOW_ACTIVE);
        
        case K_SHOW_COMPLETED:
            return data.filter(todo => todo.status === K_SHOW_COMPLETED);
        
        default:
            return data;
    }

}