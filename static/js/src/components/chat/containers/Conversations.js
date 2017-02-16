/**
 * Created by yura on 16.02.17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as conversationActions from '../actions/ConversationActions'


const mapStateToProps = state => {
    return { ...state }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...conversationActions }, dispatch)
    }
};

class ConversationsComponent extends React.Component {
    constructor( props ) {
        super( props );

        this.props.actions.fetchChats();
    }

    render() {
        let listContent = [];

        if ( this.props.conversationsState.fetching ) {
            listContent = <li className="list-group-item">Fetching</li>
        } else if ( this.props.conversationsState.conversations.length == 0 ) {
            listContent = <li className="list-group-item">Nothing to show!</li>
        } else {
            listContent = this.props.conversationsState.conversations.map( (conversation, index) => <li key={ index } className="list-group-item">{ conversation.title }</li> )
        }

        return (
            <div className="col-sm-2">
                <p>{ this.props.conversationsState.error }</p>
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
)( ConversationsComponent )
