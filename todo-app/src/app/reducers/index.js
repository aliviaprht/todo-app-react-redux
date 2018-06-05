import {combineReducers} from 'redux';
import {
    K_SYSTEM_RESET_ALL
} from '../constants/constantSystem'
import todos from './Todo';

const appReducer =  combineReducers({
    todos
});

export default function rootReducer(state,action) {
    return function(state, action) {
        if(action.type === K_SYSTEM_RESET_ALL) {
            state = undefined;
        }
    
        return appReducer(state,action);
    }
};
