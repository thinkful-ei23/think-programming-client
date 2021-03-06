import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import{ clearAuthToken } from "../local-storage";
import { API_BASE_URL_SOCKET } from '../config';
import io from "socket.io-client";
import tplogo from './images/logo/TP-logo.png';
import './styles/header-bar.css';

export class HeaderBar extends Component {
    		
	socket = io.connect(`${API_BASE_URL_SOCKET}/dashboard`);
	
	logOut() {
		return Promise.all([
			this.socket.emit('USER_EXIT', this.props.auth.currentUser.username)
		])
		.then(() => {
			this.props.dispatch(clearAuth());
					clearAuthToken();
		});
	}

	render() {
		let logOutButton;
		if (this.props.loggedIn) {
			logOutButton = (
				<button onClick={() => this.logOut()} className="logout"> Log out</button>
			);
		}
		return (
			<div className="header-bar">
				<div>
					<Link to="/dashboard">
						<img src={tplogo} className="header-bar-img" alt="Think Programming Logo" />
					</Link>
				</div>
				{logOutButton}
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        loggedIn: state.auth.currentUser !== null,
    }
};

export default connect(mapStateToProps)(HeaderBar);
