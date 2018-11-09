import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from "socket.io-client";

import requiresLogin from './requires-login';
import { API_BASE_URL_SOCKET } from '../config';

import './styles/chatroom.css';


class Chatroom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			messageToBePosted: []
			// messageFrom: ''
		}
		this.socket = io.connect(`${API_BASE_URL_SOCKET}/chatroom`);
		
		// Whenever the server emits 'new message', update the chat body
		this.socket.on('new message', (message) => {
			console.log('message: ', message);
			this.addChatMessage(message);
		});
	};

	// componentDidMount() {
	// 	this.socket.emit('get chat', this.state.message, this.props.name);
	// };

	//1. method 'get chat' emit
	//2. server - listen for 'get chat'
	//3. 

	addChatMessage(incoming){
		// console.log('`addChatMessage` ran ', incoming); // incoming object -> {name: '', message: ''}
		this.setState({
			messageToBePosted: incoming
		});
	};
	
	handleChange(e) {
		this.setState({
			message: e.target.value
		});
	};
	
	handleSubmit(e) {
		e.preventDefault();
		// console.log('from handleSubmit: ', this.state.message);
		this.sendMessage(this.state.message, this.props.name);
		this.setState({
			message: ''
		});
	};	
	
	sendMessage(message, name) {
		// console.log('from sendMessage: ', message, 'from', name);
		this.socket.emit('new message', message, name);
	}
	
	render() {
		let chatEntries = this.state.messageToBePosted; // [{name: '', message: ''}]
		// console.log('`chatEntries`: ', chatEntries);

		// let listChat = chatEntries.map((msg, i) => this.createChatList(msg, i));
		let listChat = chatEntries.map((msg, i) => {
			// console.log('`msg`: ', msg);
			return (
				<li key={i}>
					<span className="sender">
						{msg.name}: 
					</span>
					<span className="message">
						{msg.message}
					</span>
				</li>
			)
		});


		return (
			<div className="chatroom">
				<Link to="/dashboard" className="dashboard-link">
					Back to Dashboard
				</Link>
				<h3>Chatroom - Welcome {this.props.name}!</h3>
				<ul className="pages">
					<li className="chat page">
						<div className="chatArea">
							<ul className="messages">
								{listChat}
							</ul>
						</div>
						<form onSubmit={(e) => this.handleSubmit(e)}
						className="chat-form">
							<input 
								id="m" 
								onChange={(e) => this.handleChange(e)}
								value={this.state.message} 
								autoComplete="off" 
								type="text"
							/>
							<button>Send</button>
						</form>
					</li>
				</ul>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {currentUser} = state.auth;
  return {
      username: state.auth.currentUser.username,
      name: currentUser.name,
      gameRoom: state.gameRoom
  };
};

export default requiresLogin()(connect(mapStateToProps)(Chatroom));