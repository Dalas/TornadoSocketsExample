/**
 * Created by yura on 21.02.17.
 */

import React from 'react';
import fetch from 'isomorphic-fetch';
import Loader from '../loader';
import TeamsListComponent from './TeamsListComponent';


export default class extends React.Component {
    constructor( props ) {
        super( props );

        this.fetchTeams = this.fetchTeams.bind( this );
        this.handleCreateTeamClick = this.handleCreateTeamClick.bind( this );

        this.state = {
            fetching: false,
            teams: []
        };
    }

    componentDidMount() {
        this.fetchTeams()
    }

    handleCreateTeamClick() {
        fetch('/api/v1/teams', {
            method: 'POST',
            credentials: 'same-origin'
        }).then( response => {
            if (response.status >= 400) {
                throw true;
            }
            else {
                response.json().then(data => {
                    this.state.teams.unshift(data);
                    this.setState({fetching: false});
                });
            }
        }).catch( error => this.setState({fetching: false}) )
    }

    fetchTeams() {
        this.setState({fetching: true});

        fetch('/api/v1/teams', {
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
                return <TeamsListComponent
                    clickHandler={ () => this.props.select_team( team ) }
                    key={ index }
                    team={ team }
                    currentUserId={ this.props.user_id }
                />
            });
        else
            listContent = <li className="list-group-item">nothing to show</li>;

        return (
            <div>
                <button onClick={ this.handleCreateTeamClick } className={`btn btn-primary create-team-button ${ this.state.fetching ? "disabled" : "" }`}>Create team</button>
                <ul className="list-group teams-list">
                    <Loader display={ this.state.fetching } />
                    { listContent }
                </ul>
            </div>
        )
    }
}