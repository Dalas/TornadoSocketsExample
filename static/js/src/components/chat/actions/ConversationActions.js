/**
 * Created by yura on 16.02.17.
 */

import { START_FETCHING_CONVERSATION, FINISH_FETCHING_CONVERSATION, FINISH_FETCHING_CONVERSATION_WITH_ERROR, RECEIVE_MESSAGE, SEND_MESSAGE } from './ActionTypes';
import fetch from 'isomorphic-fetch';


export function startFetchingConversation() {
    return {
        type: START_FETCHING_CONVERSATION
    }
}

export function finishFetchingChat(conversations) {
    return {
        type: FINISH_FETCHING_CONVERSATION,
        conversations: conversations
    }
}

export function finishFetchingConversationWithError() {
    return {
        type: FINISH_FETCHING_CONVERSATION_WITH_ERROR
    }
}

export function fetchChats() {
    return dispatch => {
        dispatch(startFetchingConversation());

        fetch('/api/v1/conversations', {
            method: 'GET',
            credentials: 'same-origin'
        }).then( response => {
            if (response.status >= 400) {
                dispatch(finishFetchingConversationWithError());
            }
            else {
                response.json().then(conversations => {
                    dispatch(finishFetchingChat(conversations));
                });
            }
        }).catch( error => dispatch(finishFetchingConversationWithError()) )
    }
}
