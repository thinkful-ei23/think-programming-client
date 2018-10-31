import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { API_BASE_URL_SOCKET } from '../config';
import './game-room.css';

class GameRoom extends Component {
  constructor(props) {
    super(props);
      this.state = {
        myTyping: '',
        challengerTyping: ''
      }
	this.socket = io(API_BASE_URL_SOCKET);
  this.socket.on('TYPING', (incomming) => {
    if (incomming.username === this.props.username) {
      this.setState({ myTyping: incomming.input });
    } else {
      this.setState({ challengerTyping: incomming.input })
    }
  });
  }
  sendMessage(e){
    this.socket.emit('TYPING', { username: this.props.username, input: e.currentTarget.value });
  }
render() {
  return (
    <div className="game-room">
      <h1>GameRoom</h1>
      <div className='challenger-typing'>{this.state.challengerTyping}</div>
      <textarea type="text" onChange={e => this.sendMessage(e)} rows="4" cols="50"/>
      {/* <div>{this.state.myTyping}</div> */}
    </div>
		)
	}
}

const mapStateToProps = state => ({
    username: state.auth.currentUser.username
});

export default (connect(mapStateToProps)(GameRoom));
