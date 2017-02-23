/**
 * Created by yura on 21.02.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../components/teams/store/store';
import TeamsComponent from '../components/teams/containers/Teams';
//import TeamComponent from '../components/teams/containers/TeamComponent';
import EditableTeamComponent from '../components/teams/containers/EditableTeam';
import Loader from '../components/loader';


class TeamsPage extends React.Component {
    constructor( props ) {
        super(props);
    }

    render() {
        return (
            <Provider store={ store }>
                <div className="col-sm-12">
                    <Loader display={ this.props.fetching } />
                    <div className="col-sm-3">
                        <TeamsComponent />
                    </div>
                    <div className="col-sm-8">
                        {/*{ this.state.current_user._id == this.state.current_team.owner ?
                             :
                            /!*<TeamComponent current_team={ this.state.current_team } />*!/
                        }//*/}
                        <EditableTeamComponent />
                    </div>
                </div>
            </Provider>
        )

    }
}

ReactDOM.render(<TeamsPage />, document.getElementById('container'));