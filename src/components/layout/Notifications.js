import React, { Fragment } from 'react'

function Notifications() {

    return (
        <Fragment>
            <a className="btn btn-floating dropdown-trigger" href="#!">
                <i className="material-icons">add_alert</i>
            </a> 
            <ul className="dropdown-content">
                <li><a href="#!">one<span className="badge">1</span></a></li>
                <li><a href="#!">two<span className="new badge">1</span></a></li>
                <li><a href="#!">three</a></li>
            </ul>
        </Fragment>
    )   
}

export default Notifications