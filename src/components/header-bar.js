import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import{ clearAuthToken } from "../local-storage";

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
                <h1>Think Programming</h1>
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(HeaderBar);
