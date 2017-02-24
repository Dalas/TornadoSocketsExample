/**
 * Created by yura on 22.02.17.
 */

import React from 'react';
import UsersActions from './Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../actions/UsersActions';
import * as teamActions from '../actions/TeamActions';


class TeamComponent extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            team: props.current_team
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            team: nextProps.current_team
        })
    }

    render() {
        let component;

        if (this.state.team._id == -1) {
            component = <div>Nothing to show!</div>
        }
        else {
            component = <div>
                <UsersActions />
                <h3>Information:</h3>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>ID:</td>
                            <td>{ this.state.team._id }</td>
                        </tr>
                        <tr>
                            <td>Title:</td>
                            <td>{ this.state.team.title }</td>
                        </tr>
                        <tr>
                            <td>Owner:</td>
                            <td>{ this.state.team.github_url }</td>
                        </tr>
                        <tr>
                            <td>GitHub:</td>
                            <td>{ this.state.team.github_url }</td>
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
                        { this.state.members ? this.state.members.map( (member, index) => {
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
    console.log(state)
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
