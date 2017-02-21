/**
 * Created by yura on 21.02.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TeamsComponent from '../components/teams/TeamsComponent';
import Loader from '../components/loader';


class TeamsPage extends React.Component {
    constructor( props ) {
        super(props);

        this.fetchCurrentUser = this.fetchCurrentUser.bind( this );

        this.state = {
            fetching: false,
            current_user: {
                _id: -1
            }
        }
    }

    componentDidMount() {
        this.fetchCurrentUser();
    }

    fetchCurrentUser() {
        this.setState({fetching: true});

        fetch('/api/v1/user', {
            method: 'GET',
            credentials: 'same-origin'
        }).then( response => {
            if (response.status >= 400) {
                throw true;
            }
            else {
                response.json().then(data => {
                    this.setState({fetching: false, current_user: data});
                });
            }
        }).catch( error => this.setState({fetching: false}) )
    }

    render() {
        return (
            <div className="col-sm-12">
                <Loader display={ this.state.fetching } />
                <div className="col-sm-3">
                    <TeamsComponent user_id={ this.state.current_user._id } />
                </div>
            </div>
        )

    }
}

ReactDOM.render(<TeamsPage />, document.getElementById('container'));