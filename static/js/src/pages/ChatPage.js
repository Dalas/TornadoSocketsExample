/**
 * Created by yura on 15.02.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import UsersList from '../components/chat/Users';


class MainChatPageComponent extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>It's React!
                <UsersList users={['Yura', 'Dima', 'Sergey']} />
            </div>
        )
    }
}

ReactDOM.render(<MainChatPageComponent />, document.getElementById('container'));