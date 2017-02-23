/**
 * Created by yura on 23.02.17.
 */

import {SELECT_TEAM, FINISH_FETCHING_TEAMS, START_TEAM_CREATION, FINISH_TEAM_CREATION, FINISH_TEAM_CREATION_WITH_ERROR} from '../actions/ActionTypes';


const initialState = {
    teams: [],
    index: -1,
    current_team: {},
    fetching: false,
    error: ''
};

export default function ( state=initialState, action ) {
    switch( action.type ) {
        case FINISH_FETCHING_TEAMS:
            return { ...state, teams: action.teams };

        case SELECT_TEAM:
            return { ...state, index: action.index, current_team: state.teams[action.index] };

        case START_TEAM_CREATION:
            return { ...state, fetching: true, error: '' };

        case FINISH_TEAM_CREATION:
            let teams = state.teams;
            teams.unshift(action.team);

            return { ...state, teams: teams, fetching: false };

        case FINISH_TEAM_CREATION_WITH_ERROR:
            return { ...state, fetching: false, error: 'Something went wrong!' };

        default:
            return { ...state }
    }
}
