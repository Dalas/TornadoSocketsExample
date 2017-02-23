/**
 * Created by yura on 22.02.17.
 */

import React from 'react';

export default ({ clickHandler, team, currentUserId }) => {
    let getMyStatus = () => {
        let status = "";
        team.members.find((member, index, callback) => {
            if (member._id == currentUserId) status = member.status
        });

        return status;
    };

    return (
        <li onClick={ clickHandler } className="list-group-item">
            { team.title }
            { team.owner == currentUserId ? <span className="label label-success my-label">{ getMyStatus() }</span> : '' }
        </li>
    )
}