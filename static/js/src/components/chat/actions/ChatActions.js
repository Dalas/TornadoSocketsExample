/**
 * Created by yura on 16.02.17.
 */

import { START_FETCHING_CHAT, FINISH_FETCHING_CHAT, FINISH_FETCHING_CHAT_WITH_ERROR, RECEIVE_MESSAGE, SEND_MESSAGE } from './ActionTypes';
import fetch from 'isomorphic-fetch';


export function startFetchingChat() {
    return {
        type: START_FETCHING_CHAT
    }
}

export function finishFetchingChat(chats) {
    return {
        type: FINISH_FETCHING_CHAT,
        chats: chats
    }
}

export function finishFetchingChatWithError() {
    return {
        type: FINISH_FETCHING_CHAT_WITH_ERROR
    }
}

export function fetchChats() {
    return dispatch => {
        dispatch(startFetchingChat());

        fetch('/api/v1/chats', {
            method: 'GET',
            credentials: 'same-origin'
        }).then( response => {
            if (response.status >= 400) {
                dispatch(finishFetchingChatWithError());
            }
            else {
                response.json().then(chats => {
                    dispatch(finishFetchingChat(chats));
                });
            }
        }).catch( error => dispatch(finishFetchingChatWithError()) )
    }
}
