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

export function finishFetchingChat(chat_id, messages, current_user) {
    return {
        type: FINISH_FETCHING_CHAT,
        chat_id: chat_id,
        messages: messages,
        current_user: current_user
    }
}

export function finishFetchingChatWithError() {
    return {
        type: FINISH_FETCHING_CHAT_WITH_ERROR
    }
}

export function fetchChat(member_id) {
    return dispatch => {
        dispatch(startFetchingChat(member_id));
        fetch('/api/v1/chats', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({member_id: member_id})
        }).then( response => {
            console.log(response)
            if (response.status >= 400) {
                dispatch(finishFetchingChatWithError());
            }
            else {
                response.json().then(data => {

                    dispatch(finishFetchingChat(data.chat_id, data.messages, data.current_user));
                });
            }
        }).catch( error => dispatch(finishFetchingChatWithError() ) )
    }
}