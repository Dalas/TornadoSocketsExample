/**
 * Created by yura on 15.02.17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../actions/UsersActions';
import { fetchChat } from '../actions/ChatActions';


const mapStateToProps = state => {
    return { ...state }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...usersActions, fetchChat: fetchChat }, dispatch)
    }
};

class UsersComponent extends React.Component {
    constructor( props ) {
        super( props );

        this.props.actions.fetchUsers();
    }

    render() {
        let listContent = [];

        if ( this.props.usersState.fetching ) {
            listContent = <li className="list-group-item">Fetching</li>
        } else if ( this.props.usersState.users.length == 0 ) {
            listContent = <li className="list-group-item">Nothing to show!</li>
        } else {
            listContent = this.props.usersState.users.map( (user, index) => <li key={ index } className="list-group-item flex-center">
                <span>{ user.username }</span>
                <button type="button" className="btn btn-default"
                        onClick={ () => { this.props.actions.fetchChat( user._id ) } }>Open Chat</button>
            </li> )
        }

        return (
            <div className="col-sm-3">
                <p>{ this.props.usersState.error }</p>
                <ul className="list-group">
                    { listContent }
                </ul>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( UsersComponent )
