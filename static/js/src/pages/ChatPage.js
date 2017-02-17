/**
 * Created by yura on 15.02.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../components/chat/store/store';
import UsersList from '../components/chat/containers/Users';
import ConversationsList from '../components/chat/containers/Conversations';
import Chat from '../components/chat/containers/Chat';


class MainChatPageComponent extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Provider store={ store }>
                    <UsersList />
                </Provider>
                <Provider store={ store }>
                    <ConversationsList />
                </Provider>
                <Provider store={ store }>
                    <Chat />
                </Provider>
            </div>
        )
    }
}

ReactDOM.render(<MainChatPageComponent />, document.getElementById('container'));