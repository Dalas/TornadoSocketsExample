/**
 * Created by yura on 16.02.17.
 */

import { START_FETCHING_CONVERSATIONS, FINISH_FETCHING_CONVERSATIONS, FINISH_FETCHING_CONVERSATIONS_WITH_ERROR } from '../actions/ActionTypes';


const initialState = {
    conversations: [],
    fetching: false,
    error: '',
    currentChat: ''
};

export default (state=initialState, action) => {
    switch (action.type) {
        case START_FETCHING_CONVERSATIONS:
            return { ...state, fetching: true, error: '' };

        case FINISH_FETCHING_CONVERSATIONS:
            return { ...state, fetching: false, conversations: action.conversations };

        case FINISH_FETCHING_CONVERSATIONS_WITH_ERROR:
            return { ...state, fetching: false, error: 'Something went wrong!' };

        default: return state;
    }
}