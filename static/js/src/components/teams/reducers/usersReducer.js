/**
 * Created by yura on 23.02.17.
 */

import {START_FETCHING_CURRENT_USER, FINISH_FETCHING_CURRENT_USER, FINISH_FETCHING_CURRENT_USER_WITH_ERROR,
        START_SEARCHING_MEMBERS, FINISH_SEARCHING_MEMBERS, FINISH_SEARCHING_MEMBERS_WITH_ERROR,
        SELECT_MEMBER, START_INVITE_MEMBER, FINISH_INVITE_MEMBER, FINISH_INVITE_MEMBER_WITH_ERROR,
        START_ACCEPT_INVITE, FINISH_ACCEPT_INVITE, FINISH_ACCEPT_INVITE_WITH_ERROR,
        START_DECLINE_INVITE, FINISH_DECLINE_INVITE, FINISH_DECLINE_INVITE_WITH_ERROR} from '../actions/ActionTypes';


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
            return { ...state, fetching: false, error: action.error };

        case START_SEARCHING_MEMBERS:
            return { ...state, fetching_members: true, error: '', current_member: {} };

        case FINISH_SEARCHING_MEMBERS:
            return { ...state, fetching_members: false, members: action.members };

        case FINISH_SEARCHING_MEMBERS_WITH_ERROR:
            return { ...state, fetching_members: false, error: action.error };

        case SELECT_MEMBER:
            return { ...state, current_member: action.member };

        case START_INVITE_MEMBER:
            return { ...state, fetching_members: true, current_member: {} };

        case FINISH_INVITE_MEMBER:
            return { ...state, fetching_members: false };

        case FINISH_INVITE_MEMBER_WITH_ERROR:
            return { ...state, fetching_members: false, error: action.error, current_member: {}, members: [] };

        case START_ACCEPT_INVITE:
            return { ...state, fetching_accept_invite: true};

        case FINISH_ACCEPT_INVITE:
            return { ...state, fetching_accept_invite: false };

        case FINISH_ACCEPT_INVITE_WITH_ERROR:
            return { ...state, fetching_accept_invite: false, error: action.error };

        case START_DECLINE_INVITE:
            return { ...state, fetching_accept_invite: true};

        case FINISH_DECLINE_INVITE:
            return { ...state, fetching_accept_invite: false };

        case FINISH_DECLINE_INVITE_WITH_ERROR:
            return { ...state, fetching_accept_invite: false, error: action.error };

        default:
            return { ...state }
    }
}
