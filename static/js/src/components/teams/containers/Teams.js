/**
 * Created by yura on 21.02.17.
 */

import React from 'react';
import Loader from '../../loader';
import TeamsListComponent from '../components/TeamsListComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as teamsActions from '../actions/TeamsActions';
import * as usersActions from '../actions/UsersAcions';
import * as teamActions from '../actions/TeamActions';


class TeamsComponent extends React.Component {
    constructor( props ) {
        super( props );

        this.props.actions.fetchTeams();
        this.props.actions.fetchCurrentUser();
    }

    render() {
        return (
            <div>
                <button onClick={ this.props.actions.createTeam } className={`btn btn-primary create-team-button ${ this.props.fetching ? "disabled" : "" }`}>Create team</button>
                <ul className="list-group teams-list">
                    <Loader display={ this.props.fetching } />
                    { this.props.teams.map( (team, index) => {
                        return (<TeamsListComponent
                                clickHandler={ () => this.props.actions.selectTeam( index ) }
                                key={ index }
                                team={ team }
                                currentUserId={ this.props.current_user._id }
                            />)
                    })}
                </ul>
            </div>
        )
    }
}

/**
* ************************************ *
**/

const mapStateToProps = state => {
    return {
        fetching: state.teamsState.fetching && state.usersState.fetching,
        teams: state.teamsState.teams,
        current_user: state.usersState.current_user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...teamsActions, ...usersActions, ...teamActions }, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( TeamsComponent )