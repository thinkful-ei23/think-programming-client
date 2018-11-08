import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { API_BASE_URL_SOCKET } from '../config';
import io from "socket.io-client";

import './styles/chatroom.css';


class Chatroom extends React.Component {
	constructor(props) {
			super(props);

			this.socket = io.connect(`${API_BASE_URL_SOCKET}/chatroom`);

	}

	
	render() {
		return (
			<div className="chatroom">
				<Link to="/dashboard" className="dashboard-link">
					Back to Dashboard
				</Link>
				<h3>Chatroom</h3>
				<ul id="messages"></ul>
				<form action="">
					<input id="m" autoComplete="off" /><button>Send</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
});

export default requiresLogin()(connect(mapStateToProps)(Chatroom));