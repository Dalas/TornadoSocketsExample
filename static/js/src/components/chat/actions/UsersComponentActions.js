/**
 * Created by yura on 15.02.17.
 */

import { START_FETCHING_USERS, FINISH_FETCHING_USERS, FINISH_FETCHING_USERS_WITH_ERROR } from './ActionTypes';
import fetch from 'isomorphic-fetch';


export function startFetchingUsers() {
    return {
        type: START_FETCHING_USERS
    }
}

export function finishFetchingUsersWithError() {
    return {
        type: FINISH_FETCHING_USERS_WITH_ERROR
    }
}

export function finishFetchingUsers( users ) {
    return {
        type: FINISH_FETCHING_USERS,
        users: users
    }
}

export function fetchUsers() {
    return dispatch => {
        dispatch(startFetchingUsers())

        fetch('/api/v1/get-users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then( response => {
            if (response.status >= 400) {
                dispatch(finishFetchingUsersWithError());
            }
            else {
                response.json().then(users => {
                    dispatch(finishFetchingUsers(users));
                });
            }
        })
    }
}