import {
    K_SET_VISIBILITY_FILTER, K_SHOW_ALL
} from '../../constants/constantFilter'

const initialState = K_SHOW_ALL;

export default function reducerFilter(state = initialState, action) {
    switch(action.type) {
        case K_SET_VISIBILITY_FILTER:
            return action.filter;
            

        default:
            return state;
    }
}