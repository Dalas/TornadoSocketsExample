/**
 * Created by yura on 17.02.17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from '../actions/ChatActions';
import NewMessageInput from '../components/MessageInput';


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
        let messages = [];

        if ( this.props.fetching ) {
            messages = <p>Fetching</p>
        } else if ( this.props.messages.length == 0 ) {
            messages = <p>Nothing to show!</p>
        } else {
            messages = this.props.messages.map( (message, index) => {
                return <p key={ index } className={ message.author.username == this.props.current_user.username ? "my-message" : "message" }>{ message.text }</p>
            })
        }

        return (
            <div className={ this.props.id ? "col-sm-6 chat-container" : "col-sm-6 chat-container hidden" }>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Panel title</h3>
                    </div>
                    <div className="panel-body messages-container">
                        { messages }
                    </div>
                    <div className="panel-footer">
                        <NewMessageInput />
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