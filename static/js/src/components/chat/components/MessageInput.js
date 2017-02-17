/**
 * Created by yura on 17.02.17.
 */

import React from 'react';


export default class extends React.Component {
    constructor( props ) {
        super(props);

        this.handleMessageChange = this.handleMessageChange.bind(this);

        this.state = {
            message: ''
        }
    }

    handleMessageChange( event ) {
        this.setState({
            message: event.target.value
        })
    }

    render() {
        return (
            <div className="new-message-container">
                <textarea onChange={ this.handleMessageChange } className="form-control" cols="25" rows="10" value={ this.state.message } />
                <button className="btn btn-default">Send message</button>
            </div>
        )
    }
}