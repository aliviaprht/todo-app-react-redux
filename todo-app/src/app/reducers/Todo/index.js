import {
    K_SHOW_ALL
} from '../../constants/constantFilter';

import reducerTodo from './reducerTodo';
import reducerFilter from './reducerFilter';

export const initialState = {
    data: [],
    filter: K_SHOW_ALL,
}

export default function reducer(state = initialState, action) {
    return {
        data: reducerTodo(state.data, action),
        filter: reducerFilter(state.filter, action)
    }
}
