/**
 * Created by yura on 15.02.17.
 */

import { START_FETCHING_USERS, FINISH_FETCHING_USERS, FINISH_FETCHING_USERS_WITH_ERROR } from '../actions/ActionTypes';


const initialState = {
    users: [],
    fetching: false,
    error: ''
};

export default (state=initialState, action) => {
    switch (action.type) {
        case START_FETCHING_USERS:
            return { ...state, fetching: true, error: '' };

        case FINISH_FETCHING_USERS:
            return { ...state, fetching: false };

        case FINISH_FETCHING_USERS_WITH_ERROR:
            return { ...state, fetching: false, error: 'Something went wrong!' };

        default: return state;
    }
}