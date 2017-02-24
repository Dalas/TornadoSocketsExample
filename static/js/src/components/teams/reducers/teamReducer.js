/**
 * Created by yura on 23.02.17.
 */

import {SELECT_TEAM, FINISH_FETCHING_TEAMS, START_TEAM_CREATION, FINISH_TEAM_CREATION, FINISH_TEAM_CREATION_WITH_ERROR,
        FINISH_INVITE_MEMBER} from '../actions/ActionTypes';


const initialState = {
    teams: [],
    index: -1,
    current_team: {_id: -1},
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

        case FINISH_INVITE_MEMBER:
            let new_teams = state.teams;
            new_teams.find((team, index, array) => {
                 if( team._id == action.team._id )
                     array[index] = action.team;
            });

            return { ...state, current_team: action.team, teams: new_teams };

        default:
            return { ...state }
    }
}
