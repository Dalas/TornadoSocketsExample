/**
 * Created by yura on 15.02.17.
 */

import React from 'react';

export default ({ users }) => {
    return (
        <ul className="list-group col-sm-2">
            { users.map( (user, index) => <li key={ index } className="list-group-item">{ user }</li> ) }
        </ul>
    )
}
