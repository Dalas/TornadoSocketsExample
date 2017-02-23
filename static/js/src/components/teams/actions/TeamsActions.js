/**
 * Created by yura on 23.02.17.
 */

import { START_FETCHING_TEAMS, FINISH_FETCHING_TEAMS, FINISH_FETCHING_TEAMS_WITH_ERROR, SELECT_TEAM } from './ActionTypes';
import fetch from 'isomorphic-fetch';

/*
* Fetching teams
* */

function startFetchingTeams() {
    return {
        type: START_FETCHING_TEAMS
    }
}

function finishFetchingTeams(teams) {
    return {
        type: FINISH_FETCHING_TEAMS,
        teams: teams
    }
}

function finishFetchingTeamsWithError() {
    return {
        type: FINISH_FETCHING_TEAMS_WITH_ERROR
    }
}

export function fetchTeams() {
    return dispatch => {
        dispatch( startFetchingTeams() );

        fetch('/api/v1/teams', {
            method: 'GET',
            credentials: 'same-origin'
        }).then( response => {
            if (response.status >= 400) {
                throw true;
            }
            else {
                response.json().then(data => {
                    dispatch( finishFetchingTeams(data) )
                });
            }
        }).catch( error => dispatch( finishFetchingTeamsWithError() ) )
    }
}
