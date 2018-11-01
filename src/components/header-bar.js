import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import{ clearAuthToken } from "../local-storage";

import tplogo from './images/logo/TP-logo.jpg';
import './styles/header-bar.css';

class HeaderBar extends Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}> Log out</button>
            );
        }
        return (
            <div className="header-bar">
                <img src={tplogo} className="header-bar-img" alt="Think Programming Logo" />
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(HeaderBar);
