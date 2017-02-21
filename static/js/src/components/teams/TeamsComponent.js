/**
 * Created by yura on 21.02.17.
 */

import React from 'react';
import fetch from 'isomorphic-fetch';
import Loader from '../loader';


export default class extends React.Component {
    constructor( props ) {
        super( props );

        this.fetchTeams = this.fetchTeams.bind( this );

        this.state = {
            fetching: false,
            teams: []
        };
    }

    componentDidMount() {
        this.fetchTeams()
    }

    fetchTeams() {
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
                    this.setState({fetching: false, teams: data});
                });
            }
        }).catch( error => this.setState({fetching: false}) )
    }

    render() {
        let listContent = [];

        if( !this.state.fetching && this.state.teams.length > 0 )
            listContent = this.state.teams.map( (team, index) => {
                return <li key={ index } className="list-group-item">team</li>
            });
        else
            listContent = <li className="list-group-item">nothing to show</li>;

        return (
            <div>
                <ul className="list-group teams-list">
                    <Loader display={ this.state.fetching } />
                    { listContent }
                </ul>
            </div>
        )
    }
}