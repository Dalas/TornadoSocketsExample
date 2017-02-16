/**
 * Created by yura on 16.02.17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from '../actions/ChatActions'


const mapStateToProps = state => {
    return { ...state }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...chatActions }, dispatch)
    }
};

class ChatsComponent extends React.Component {
    constructor( props ) {
        super( props );

        this.props.actions.fetchChats();
    }

    render() {
        let listContent = [];

        if ( this.props.chatsState.fetching ) {
            listContent = <li className="list-group-item">Fetching</li>
        } else if ( this.props.chatsState.chats.length == 0 ) {
            listContent = <li className="list-group-item">Nothing to show!</li>
        } else {
            listContent = this.props.chatsState.chats.map( (chat, index) => <li key={ index } className="list-group-item">{ chat.title }</li> )
        }

        return (
            <div className="col-sm-2">
                <p>{ this.props.chatsState.error }</p>
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
)( ChatsComponent )
