/**
 * Created by yura on 16.02.17.
 */

import { START_FETCHING_CHAT, FINISH_FETCHING_CHAT, FINISH_FETCHING_CHAT_WITH_ERROR } from './ActionTypes';


export function startFetchingChat(member_id) {
    return {
        type: START_FETCHING_CHAT,
        member_id: member_id
    }
}

export function finishFetchingChat(messages) {
    return {
        type: FINISH_FETCHING_CHAT,
        messages: messages
    }
}

export function finishFetchingChatWithError() {
    return {
        type: FINISH_FETCHING_CHAT_WITH_ERROR
    }
}

export function fetchChat(member_id) {
    return dispatch => {
        dispatch(startFetchingChat(member_id))

        fetch('/api/v1/chat', {
            method: 'GET',
            credentials: 'same-origin'
        }).then( response => {
            if (response.status >= 400) {
                dispatch(finishFetchingChatWithError());
            }
            else {
                response.json().then(conversations => {
                    dispatch(finishFetchingChat(conversations));
                });
            }
        }).catch( error => dispatch(finishFetchingChatWithError()) )
    }
}