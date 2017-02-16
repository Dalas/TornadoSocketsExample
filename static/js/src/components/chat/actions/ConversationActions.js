/**
 * Created by yura on 16.02.17.
 */

import { START_FETCHING_CONVERSATION, FINISH_FETCHING_CONVERSATION, FINISH_FETCHING_CONVERSATION_WITH_ERROR, RECEIVE_MESSAGE, SEND_MESSAGE } from './ActionTypes';
import fetch from 'isomorphic-fetch';


export function startFetchingConversations() {
    return {
        type: START_FETCHING_CONVERSATION
    }
}

export function finishFetchingConversations(conversations) {
    return {
        type: FINISH_FETCHING_CONVERSATION,
        conversations: conversations
    }
}

export function finishFetchingConversationsWithError() {
    return {
        type: FINISH_FETCHING_CONVERSATION_WITH_ERROR
    }
}

export function fetchChats() {
    return dispatch => {
        dispatch(startFetchingConversations());

        fetch('/api/v1/conversations', {
            method: 'GET',
            credentials: 'same-origin'
        }).then( response => {
            if (response.status >= 400) {
                dispatch(finishFetchingConversationsWithError());
            }
            else {
                response.json().then(conversations => {
                    dispatch(finishFetchingConversations(conversations));
                });
            }
        }).catch( error => dispatch(finishFetchingConversationsWithError()) )
    }
}
