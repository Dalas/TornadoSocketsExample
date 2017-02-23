/**
 * Created by yura on 23.02.17.
 */

import {START_FETCHING_CURRENT_USER, FINISH_FETCHING_CURRENT_USER, FINISH_FETCHING_CURRENT_USER_WITH_ERROR,
        START_FETCHING_MEMBERS, FINISH_FETCHING_MEMBERS, FINISH_FETCHING_MEMBERS_WITH_ERROR} from './ActionTypes';
import fetch from 'isomorphic-fetch';

/*
* Current user
* */

function startFetchingCurrentUser() {
    return {
        type: START_FETCHING_CURRENT_USER
    }
}

function finishFetchingCurrentUser(current_user) {
    return {
        type: FINISH_FETCHING_CURRENT_USER,
        current_user: current_user
    }
}

function finishFetchingCurrentUserWithError() {
    return {
        type: FINISH_FETCHING_CURRENT_USER_WITH_ERROR
    }
}

export function fetchCurrentUser() {
    return dispatch => {
        dispatch( startFetchingCurrentUser() );

        fetch('/api/v1/user', {
            method: 'GET',
            credentials: 'same-origin'
        }).then( response => {
            if (response.status >= 400) {
                throw true;
            }
            else {
                response.json().then(data => {
                    dispatch( finishFetchingCurrentUser(data) )
                });
            }
        }).catch( error => dispatch( finishFetchingCurrentUserWithError() ) )
    }
}
