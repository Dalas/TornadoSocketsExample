/**
 * Created by yura on 16.02.17.
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import usersReducer from '../reducers/usersReducer';
import chatsReducer from '../reducers/chatsReducer';


export default createStore(
    combineReducers({
        usersState: usersReducer,
        chatsState: chatsReducer
    }),
    applyMiddleware( ReduxThunk )
);
