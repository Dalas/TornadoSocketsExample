/**
 * Created by yura on 21.02.17.
 */

import React from 'react';


export default ({ display }) => {
    return (
        <div className={ display ? "loader" : "hidden"}>
            <img src="/static/img/loader.gif" />
        </div>
    )
}