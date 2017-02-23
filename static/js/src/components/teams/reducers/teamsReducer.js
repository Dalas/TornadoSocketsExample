/**
 * Created by yura on 23.02.17.
 */

import { START_FETCHING_TEAMS, FINISH_FETCHING_TEAMS, FINISH_FETCHING_TEAMS_WITH_ERROR, FINISH_TEAM_CREATION } from '../actions/ActionTypes';


const initialState = {
    teams: [],
    fetching: false,
    error: '',
    current_team: {}
};

export default function(state=initialState, action) {
    switch (action.type) {
        case START_FETCHING_TEAMS:
            return { ...state, fetching: true, error: '' };

        case FINISH_FETCHING_TEAMS:
            return { ...state, teams: action.teams, fetching: false };

        case FINISH_FETCHING_TEAMS_WITH_ERROR:
            return { ...state, fetching: false, error: 'Something went wrong!' };

        case FINISH_TEAM_CREATION:
            let teams = state.teams.slice();
            teams.unshift(action.team);

            return { ...state, teams: teams, fetching: false };

        default:
            return { ...state };
    }
}
