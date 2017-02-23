/**
 * Created by yura on 23.02.17.
 */

import {SELECT_TEAM, START_TEAM_CREATION, FINISH_TEAM_CREATION, FINISH_TEAM_CREATION_WITH_ERROR} from './ActionTypes';

/*
* Select team
* */

export function selectTeam(index) {
    return {
        type: SELECT_TEAM,
        index: index
    }
}

/*
* Team creation
* */

function startTeamCreation() {
    return {
        type: START_TEAM_CREATION
    }
}

function finishTeamCreation(team) {
    return {
        type: FINISH_TEAM_CREATION,
        team: team
    }
}

function finishTeamCreationWithError() {
    return {
        type: FINISH_TEAM_CREATION_WITH_ERROR
    }
}

export function createTeam() {
    return dispatch => {
        dispatch( startTeamCreation() );

        fetch('/api/v1/teams', {
            method: 'POST',
            credentials: 'same-origin'
        }).then( response => {
            if (response.status >= 400) {
                throw true;
            }
            else {
                response.json().then(data => {
                    dispatch( finishTeamCreation(data) )
                });
            }
        }).catch( error => dispatch( finishTeamCreationWithError() ) )
    }
}