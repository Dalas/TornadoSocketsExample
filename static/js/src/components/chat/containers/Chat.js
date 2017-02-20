/**
 * Created by yura on 17.02.17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from '../actions/ChatActions';
import NewMessageInput from '../components/MessageInput';
import uuid4 from 'uuid';


const mapStateToProps = state => {
    return {
        fetching: state.chatState.fetching,
        is_chat: state.chatState.is_chat,
        id: state.chatState.companion,
        messages: state.chatState.messages,
        current_user: state.chatState.current_user
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

        this.sendMessage  = this.sendMessage.bind( this );
        this.openConnection  = this.openConnection.bind( this );

        this.openConnection();
    }

    openConnection() {
        this.socket = new WebSocket(`ws://${ location.host }/ws`);

        this.socket.onopen = this.handleConnectionOpen.bind( this );
        this.socket.onclose = this.handleConnectionClose.bind( this );
        this.socket.onerror = this.handleConnectionError.bind( this );
        this.socket.onmessage = this.receiveMessage.bind( this );
    }

    handleConnectionOpen( event ) {
        console.log(event)
    }

    handleConnectionClose() {
        this.openConnection();
    }

    handleConnectionError( event ) {
        console.log(event)
    }

    receiveMessage( event ) {
        let message = JSON.parse( event.data );

        this.props.actions.receiveMessage( message );
    }

    sendMessage( message ) {
        message = {
            text: message,
            temporary_id: uuid4.v4(),
            chat_id: this.props.id,
            author: { ...this.props.current_user }
        };

        this.socket.send( JSON.stringify( message ));
        this.props.actions.sendMessage( message );
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
                        <NewMessageInput sendMessage={ this.sendMessage } />
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