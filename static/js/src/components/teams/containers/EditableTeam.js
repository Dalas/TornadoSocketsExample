/**
 * Created by yura on 22.02.17.
 */

import React from 'react';
import InviteUserComponent from './InviteUser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../actions/UsersActions';
import * as teamActions from '../actions/TeamActions';


class TeamComponent extends React.Component {
    constructor( props ) {
        console.log(props);
        super( props );
    }

    render() {
        let component;

        if ( this.props.team._id == -1 ) {
            component = <div>Nothing to show!</div>
        }
        else {
            component = <div>
                <h3>Information:</h3>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>ID:</td>
                            <td>{ this.props.team._id }</td>
                        </tr>
                        <tr>
                            <td className="align-middle">Title:</td>
                            <td><input id="team-title" className="form-control border-box" defaultValue={ this.props.team.title } /></td>
                        </tr>
                        <tr>
                            <td>Owner:</td>
                            <td>{ this.props.team.github_url }</td>
                        </tr>
                        <tr>
                            <td>GitHub:</td>
                            <td>{ this.props.team.github_url }</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Members:</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>E-mail</th>
                            <th>Status</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.team.members ? this.props.team.members.map( (member, index) => {
                            return (
                                <tr key={ index }>
                                    <td>{ member._id }</td>
                                    <td>{ member.email }</td>
                                    <td>{ member.status }</td>
                                    <td><a target="_blank" href={`/profile/${ member._id }`}>{ member.username }</a></td>
                                </tr>
                            )
                        }) :
                            <tr>
                                <td colSpan="4">Nothing to show!</td>
                            </tr>
                        }
                        <tr>
                            <td colSpan="4">
                                <InviteUserComponent />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        }

        return (
            <div>{ component }</div>
        )
    }
}

/**
* ************************************ *
**/

const mapStateToProps = state => {
    return {
        fetching: state.teamsState.fetching || state.usersState.fetching || state.teamState.fetching,
        team: state.teamState.current_team,
        current_user: state.usersState.current_user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...usersActions, ...teamActions }, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( TeamComponent )