/**
 * Created by yura on 16.02.17.
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import usersReducer from '../reducers/usersReducer';
import conversationsReducer from '../reducers/conversationsReducer';


export default createStore(
    combineReducers({
        usersState: usersReducer,
        conversationsState: conversationsReducer
    }),
    applyMiddleware( ReduxThunk )
);
