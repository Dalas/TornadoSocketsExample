/**
 * Created by yura on 15.02.17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../actions/UsersActions'


const mapStateToProps = state => {
    return { ...state }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...usersActions }, dispatch)
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
            listContent = this.props.usersState.users.map( (user, index) => <li key={ index } className="list-group-item">{ user }</li> )
        }

        return (
            <div className="col-sm-2">
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
