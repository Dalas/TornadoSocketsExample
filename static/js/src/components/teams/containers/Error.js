/**
 * Created by yura on 24.02.17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ErrorComponent extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        console.log(this.props)

        return (
            <div className="col-sm-12 errors-container">
                { this.props.errors.map( (error, index) => {
                    return <p key={ index }>{ error }</p>
                })}
            </div>
        )
    }
}

/**
* ************************************ *
**/

const mapStateToProps = state => {
    return {
        errors: [
            state.teamsState.error,
            state.teamState.error,
            state.usersState.error
        ]
    }
};

export default connect(
    mapStateToProps,
    {}
)( ErrorComponent )