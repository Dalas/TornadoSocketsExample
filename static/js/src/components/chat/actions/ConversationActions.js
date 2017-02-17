/**
 * Created by yura on 16.02.17.
 */

import { START_FETCHING_CONVERSATIONS, FINISH_FETCHING_CONVERSATIONS, FINISH_FETCHING_CONVERSATIONS_WITH_ERROR,
         START_FETCHING_CONVERSATION, FINISH_FETCHING_CONVERSATION, FINISH_FETCHING_CONVERSATION_WITH_ERROR,
         RECEIVE_MESSAGE, SEND_MESSAGE } from './ActionTypes';
import fetch from 'isomorphic-fetch';


// Conversations

export function startFetchingConversations() {
    return {
        type: START_FETCHING_CONVERSATIONS
    }
}

export function finishFetchingConversations(conversations) {
    return {
        type: FINISH_FETCHING_CONVERSATIONS,
        conversations: conversations
    }
}

export function finishFetchingConversationsWithError() {
    return {
        type: FINISH_FETCHING_CONVERSATIONS_WITH_ERROR
    }
}

export function fetchConversations() {
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

// Conversation

export function startFetchingConversation(conversation_id) {
    return {
        type: START_FETCHING_CONVERSATION,
        conversation_id: conversation_id
    }
}

export function finishFetchingConversation(messages) {
    return {
        type: FINISH_FETCHING_CONVERSATION,
        messages: messages
    }
}

export function finishFetchingConversationWithError() {
    return {
        type: FINISH_FETCHING_CONVERSATION_WITH_ERROR
    }
}

export function fetchConversation(conversation_id) {
    return dispatch => {
        dispatch(startFetchingConversation());

        fetch('/api/v1/conversations', {
            method: 'GET',
            credentials: 'same-origin',
            body: JSON.stringify({conversation_id: conversation_id})
        }).then( response => {
            if (response.status >= 400) {
                dispatch(finishFetchingConversationWithError(conversation_id));
            }
            else {
                response.json().then(messages => {
                    dispatch(finishFetchingConversation(messages));
                });
            }
        }).catch( error => dispatch(finishFetchingConversationWithError()) )
    }
}
