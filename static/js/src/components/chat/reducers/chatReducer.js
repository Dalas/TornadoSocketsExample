/**
 * Created by yura on 16.02.17.
 */

import { START_FETCHING_CHAT, FINISH_FETCHING_CHAT, FINISH_FETCHING_CHAT_WITH_ERROR,
         START_FETCHING_CONVERSATION, FINISH_FETCHING_CONVERSATION, FINISH_FETCHING_CONVERSATION_WITH_ERROR,
         SEND_MESSAGE, RECEIVE_MESSAGE} from '../actions/ActionTypes';


const initialState = {
    messages: [],
    fetching: false,
    error: '',
    companion: '',
    is_chat: true
};

export default function(state=initialState, action) {
    let messages = [];

    switch (action.type) {
        case START_FETCHING_CHAT:
            return { ...state, fetching: true, error: '', is_chat: true };

        case FINISH_FETCHING_CHAT:
            return { ...state, fetching: false, messages: action.messages, companion: action.chat_id, current_user: action.current_user };

        case FINISH_FETCHING_CHAT_WITH_ERROR:
            return { ...state, fetching: false, messages: [], error: 'Something went wrong!', companion: '' };

        case START_FETCHING_CONVERSATION:
            return { ...state, fetching: true, error: '', companion: action.conversation_id, is_chat: false };

        case FINISH_FETCHING_CONVERSATION:
            return { ...state, fetching: false, messages: action.messages };

        case FINISH_FETCHING_CONVERSATION_WITH_ERROR:
            return { ...state, fetching: false, messages: [], error: 'Something went wrong!', companion: '' };

        case SEND_MESSAGE:
            messages = state.messages.slice();
            action.message.status = 'SENDING';
            messages.push(action.message);

            return { ...state, messages: messages };

        case RECEIVE_MESSAGE:
            messages = state.messages.slice();
            if( 'temporary_id' in action.message )
                messages.find( (element, index, arr) => {
                    if( element.temporary_id == action.message.temporary_id ) {
                        delete element.temporary_id;
                        delete element.status;
                    }
                });

            return { ...state, messages: messages };

        default: return { ...state }
    }
}