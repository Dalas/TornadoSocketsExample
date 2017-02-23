/**
 * Created by yura on 21.02.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../components/teams/store/store';
import TeamsComponent from '../components/teams/containers/Teams';
//import TeamComponent from '../components/teams/containers/TeamComponent';
//import EditableTeamComponent from '../components/teams/containers/EditableTeamComponent';
import Loader from '../components/loader';


class TeamsPage extends React.Component {
    constructor( props ) {
        super(props);

        this.handleCurrentTeamChange = this.handleCurrentTeamChange.bind( this );

        this.state = {
            fetching: false,
            current_user: {
                _id: -1
            },
            current_team: {
                _id: -1,
                owner: -1
            }
        }
    }

    handleCurrentTeamChange( team ) {
        this.setState({
            current_team: team
        })
    }

    handleTeamChange() {
        this.setState({

        })
    }

    render() {
        return (
            <Provider store={ store }>
                <div className="col-sm-12">
                    <Loader display={ this.state.fetching } />
                    <div className="col-sm-3">
                        <TeamsComponent />
                    </div>
                    {/*<div className="col-sm-8">
                        { this.state.current_user._id == this.state.current_team.owner ?
                            <EditableTeamComponent current_team={ this.state.current_team } /> :
                            <TeamComponent current_team={ this.state.current_team } />
                        }
                    </div>*/}
                </div>
            </Provider>
        )

    }
}

ReactDOM.render(<TeamsPage />, document.getElementById('container'));