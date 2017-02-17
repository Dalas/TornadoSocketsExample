/**
 * Created by yura on 17.02.17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from '../actions/ChatActions';


const mapStateToProps = state => {
    return {
        fetching: state.chatState.fetching,
        is_chat: state.chatState.is_chat,
        id: state.chatState.companion,
        messages: state.chatState.messages
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...chatActions }, dispatch)
    }
};

class ChatComponent extends React.Component {
    constructor( props ) {
        super(props);
    }

    render() {
        console.log(this);
        return (
            <div className="col-sm-6">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Panel title</h3>
                    </div>
                    <div className="panel-body">
                        Panel content
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( ChatComponent )