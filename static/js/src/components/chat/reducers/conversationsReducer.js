/**
 * Created by yura on 16.02.17.
 */

import { START_FETCHING_CONVERSATION, FINISH_FETCHING_CONVERSATION, FINISH_FETCHING_CONVERSATION_WITH_ERROR } from '../actions/ActionTypes';


const initialState = {
    conversations: [],
    fetching: false,
    error: '',
    currentChat: ''
};

export default (state=initialState, action) => {
    switch (action.type) {
        case START_FETCHING_CONVERSATION:
            return { ...state, fetching: true, error: '' };

        case FINISH_FETCHING_CONVERSATION:
            return { ...state, fetching: false, conversations: action.conversations };

        case FINISH_FETCHING_CONVERSATION_WITH_ERROR:
            return { ...state, fetching: false, error: 'Something went wrong!' };

        default: return state;
    }
}