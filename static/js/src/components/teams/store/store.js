/**
 * Created by yura on 23.02.17.
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import teamsReducer from '../reducers/teamsReducer';
import teamReducer from '../reducers/teamReducer';
import usersReducer from '../reducers/usersReducer';


export default createStore(
    combineReducers({
        teamsState: teamsReducer,
        usersState: usersReducer,
        teamState: teamReducer
    }),
    applyMiddleware( ReduxThunk )
);