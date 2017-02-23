/**
 * Created by yura on 23.02.17.
 */

import {START_FETCHING_CURRENT_USER, FINISH_FETCHING_CURRENT_USER, FINISH_FETCHING_CURRENT_USER_WITH_ERROR,
        START_FETCHING_MEMBERS, FINISH_FETCHING_MEMBERS, FINISH_FETCHING_MEMBERS_WITH_ERROR} from '../actions/ActionTypes';


const initialState = {
    current_user: {},
    members: [],
    fetching: false,
    error: ''
};

export default function (state=initialState, action) {
    switch (action.type) {
        case START_FETCHING_CURRENT_USER:
            return { ...state, fetching: true, error: '' };

        case FINISH_FETCHING_CURRENT_USER:
            return { ...state, fetching: false, current_user: action.current_user };

        case FINISH_FETCHING_CURRENT_USER_WITH_ERROR:
            return { ...state, fetching: false, error: 'Something went wrong!' };

        default:
            return { ...state }
    }
}
