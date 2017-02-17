/**
 * Created by yura on 17.02.17.
 */

import React from 'react';


export default class extends React.Component {
    constructor( props ) {
        super(props);
    }

    render() {
        return (
            <div className="new-message-container">
                <textarea className="form-control" cols="25" rows="10"></textarea>
                <button className="btn btn-default">Send message</button>
            </div>
        )
    }
}