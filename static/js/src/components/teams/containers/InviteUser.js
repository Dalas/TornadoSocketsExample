/**
 * Created by yura on 23.02.17.
 */

import React from 'react';
import { findDOMNode } from 'react-dom';
import { Debounce } from 'react-throttle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../actions/UsersActions';


class InviteMembersComponent extends React.Component {
    constructor(props) {
        super( props );

        this.handleUserInputChange = this.handleUserInputChange.bind( this );
        this.handleSelectUser = this.handleSelectUser.bind( this );
        this.setInputValue = this.setInputValue.bind( this );
        this.showUsers = this.showUsers.bind( this );
        this.hideUsers = this.hideUsers.bind( this );

        this.state = {
            username: '',
            show: false,
            users: [],
            selected_user: ''
        };

        document.addEventListener("click", this.hideUsers)
    }

    handleUserInputChange( event ) {
        this.setState({
            username: event.target.value,
            selected_user: ''
        });

        this.setInputValue( event.target.value );

        if( event.target.value )
            this.fetchAvailableUsers(event.target.value)
    }

    showUsers(event) {
        event.nativeEvent.stopImmediatePropagation();

        this.setState({
            show: true
        })
    }

    hideUsers() {
        this.setState({
            show: false
        })
    }

    handleSelectUser(event, user) {
        this.setState({
            selected_user: user._id,
            username: user.username
        });

        this.setInputValue(user.username)
    }

    setInputValue(value) {
        findDOMNode(this.refs.searchInput).value = value;
    }

    render() {
        return (
            <div className="form-group row">
                <div className="col-sm-8">
                    <Debounce time="500" handler="onChange">
                        <input ref="searchInput" onClick={ this.showUsers } className="form-control border-box" type="text" defaultValue={ this.state.username } onChange={ this.handleUserInputChange } />
                    </Debounce>
                    <ul className={`list-group users-preview-list ${ this.state.show ? "" : "hidden" }`}>
                        { this.state.users.map( (user, index) => {
                            return <li key={ index } onClick={ (event) => { this.handleSelectUser( event, user ) } } className="list-group-item">{ user.username }</li>
                        })}
                    </ul>
                </div>
                <button disabled={ !this.state.selected_user } className="btn btn-primary col-sm-3">Invite User</button>
            </div>
        )
    }
}

/**
* ************************************ *
**/

const mapStateToProps = state => {
    return {
        fetching: state.usersState.fetching_members,
        users: state.usersState.members,
        current_user: state.usersState.current_user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...usersActions }, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( InviteMembersComponent )