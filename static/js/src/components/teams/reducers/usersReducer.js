/**
 * Created by yura on 23.02.17.
 */

import {START_FETCHING_CURRENT_USER, FINISH_FETCHING_CURRENT_USER, FINISH_FETCHING_CURRENT_USER_WITH_ERROR,
        START_SEARCHING_MEMBERS, FINISH_SEARCHING_MEMBERS, FINISH_SEARCHING_MEMBERS_WITH_ERROR,
        SELECT_MEMBER, START_INVITE_MEMBER, FINISH_INVITE_MEMBER, FINISH_INVITE_MEMBER_WITH_ERROR} from '../actions/ActionTypes';


const initialState = {
    current_member: {},
    current_user: {},
    members: [],
    fetching: false,
    fetching_members: false,
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

        case START_SEARCHING_MEMBERS:
            return { ...state, fetching_members: true, error: '', current_member: {} };

        case FINISH_SEARCHING_MEMBERS:
            return { ...state, fetching_members: false, members: action.members };

        case FINISH_SEARCHING_MEMBERS_WITH_ERROR:
            return { ...state, fetching_members: false, error: 'Something went wrong!' };

        case SELECT_MEMBER:
            return { ...state, current_member: action.member };

        case START_INVITE_MEMBER:
            return { ...state, fetching_members: true, current_member: {} };

        case FINISH_INVITE_MEMBER:
            return { ...state, fetching_members: false };

        case FINISH_INVITE_MEMBER_WITH_ERROR:
            return { ...state, fetching_members: false };

        default:
            return { ...state }
    }
}
