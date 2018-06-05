import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import createReducer from './reducers/'

export default function configureStore(initialState = {}) {
    const middlewares = [logger, thunk];
    const enhancers = [applyMiddleware(...middlewares)];

    const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
    }) : compose;

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers)
    );

    return store;
    
}