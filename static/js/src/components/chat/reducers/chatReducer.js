/**
 * Created by yura on 16.02.17.
 */

import { START_FETCHING_CHAT, FINISH_FETCHING_CHAT, FINISH_FETCHING_CHAT_WITH_ERROR } from '../actions/ActionTypes';


const initialState = {
    messages: [],
    fetching: false,
    error: ''
};

export default function(state=initialState, action) {
    switch (action.type) {
        case START_FETCHING_CHAT:
            return { ...state, fetching: true, error: '' };

        case FINISH_FETCHING_CHAT:
            return { ...state, fetching: false, messages: action.messages, error: '' };

        case FINISH_FETCHING_CHAT_WITH_ERROR:
            return { ...state, fetching: false, messages: [], error: 'Something went wrong!' };
    }
}