/**
 * Created by yura on 24.02.17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../actions/UsersActions';


class ActionsComponent extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        let actions = [];
        let my_status_status = {};

        this.props.team.members.find((member, array, index) => {
            if( member._id == this.props.current_user._id ) {
                my_status_status = member.status;
            }
        });

        if( my_status_status == "INVITED" ) {
            actions.push(
                <button key="accept" className="btn btn-success">Accept invite</button>,
                <button key="decline" className="btn btn-danger">Decline invite</button>
            )
        } else if ( my_status_status == "MEMBER" ) {
            actions.push(
                <button key="leave" className="btn btn-danger">Leave team</button>
            )
        }

        return (
            <div className="col-sm-12 row">{ actions }</div>
        )

    }
}

/**
* ************************************ *
**/

const mapStateToProps = state => {
    return {
        team: state.teamState.current_team,
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
)( ActionsComponent )