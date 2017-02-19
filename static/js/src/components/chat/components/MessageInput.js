/**
 * Created by yura on 17.02.17.
 */

import React from 'react';


export default class extends React.Component {
    constructor( props ) {
        super(props);

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.state = {
            message: ''
        }
    }

    handleMessageChange( event ) {
        this.setState({
            message: event.target.value
        })
    }

    sendMessage( event ) {
        if( !this.state.message ) return;

        this.props.sendMessage( this.state.message );
        this.setState({
            prevMessage: this.state.message,
            message: ''
        })
    }

    render() {
        return (
            <div className="new-message-container">
                <textarea onChange={ this.handleMessageChange } className="form-control" cols="25" rows="10" value={ this.state.message } />
                <button onClick={ this.sendMessage } className="btn btn-default">Send message</button>
            </div>
        )
    }
}