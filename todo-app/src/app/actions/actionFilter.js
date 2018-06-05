import {
    K_SET_VISIBILITY_FILTER
} from '../constants/constantFilter';

export function visibilityFilter(filter){
    return {
        type: K_SET_VISIBILITY_FILTER,
        filter
    }
}