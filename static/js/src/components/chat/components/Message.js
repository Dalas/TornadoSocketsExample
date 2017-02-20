/**
 * Created by yura on 20.02.17.
 */

import React from 'react';

export default ({ message, current_user }) => {
    return (
        <li className={ message.author._id == current_user._id ? "my-message" : "message" }>
            <p>{ message.author.username }</p>
            <p>{ message.text }</p>
            <p>{ message.datetime }</p>
        </li>
    )
}