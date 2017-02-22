/**
 * Created by yura on 22.02.17.
 */

import React from 'react';

export default ({ clickHandler, team, currentUserId }) => {
    return (
        <li onClick={ clickHandler } className="list-group-item">
            { team.title }
            { team.owner == currentUserId ? <span className="label label-success my-label">My</span> : '' }
        </li>
    )
}