/**
 * Created by yura on 23.02.17.
 */

import React from 'react';
import { Debounce } from 'react-throttle';


export default class extends React.Component {
    constructor(props) {
        super( props );

        this.handleUserInputChange = this.handleUserInputChange.bind( this );
        this.fetchAvailableUsers = this.fetchAvailableUsers.bind( this );
        this.handleFocus = this.handleFocus.bind( this );
        this.handleBlur = this.handleBlur.bind( this );

        this.state = {
            username: '',
            show: false,
            users: [],
            selected_user: ''
        }
    }

    handleUserInputChange( event ) {
        this.setState({
            username: event.target.value
        });

        if( event.target.value )
            this.fetchAvailableUsers(event.target.value)
    }

    fetchAvailableUsers(search_string) {
        fetch('/api/v1/search-users', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({search_string: search_string})
        }).then( response => {
            if (response.status >= 400) {
                throw true;
            }
            else {
                response.json().then(data => {
                    this.setState({users: data});
                });
            }
        }).catch( error => console.log(error) )
    }

    handleFocus() {
        this.setState({
            show: true
        })
    }

    handleBlur() {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div className="form-group row">
                <div className="col-sm-8">
                    <Debounce time="500" handler="onChange">
                        <input onFocus={ this.handleFocus } onBlur={ this.handleBlur } className="form-control border-box" type="text" defaultValue={ this.state.username } onChange={ this.handleUserInputChange } />
                    </Debounce>
                    <ul className={`list-group result-preview-list ${ this.state.show ? "" : "hidden" }`}>
                        { this.state.users.map( (user, index) => {
                            return <li key={ index } className="list-group-item">{ user.username }</li>
                        })}
                    </ul>
                </div>
                <button disabled={ !this.state.selected_user } className="btn btn-primary col-sm-3">Invite User</button>
            </div>
        )
    }
}