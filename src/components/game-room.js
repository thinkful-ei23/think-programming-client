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
        challengerTyping: '',
        meFinished: false,
        challengerFinished: false
      }
	this.socket = io(API_BASE_URL_SOCKET);
  this.socket.on('TYPING', (incomming) => {
    if (incomming.username === this.props.username) {
      this.setState({ myTyping: incomming.input });
    } else {
      this.setState({ challengerTyping: incomming.input })
    }
  });
  this.socket.on('FINISHED', (incomming) => {
    console.log('sent')
    if (incomming.username === this.props.username) {
      this.setState({ 
        meFinished: true,
        challengerFinished: false 
      });
    } else {
      this.setState({ 
        meFinished: false,
        challengerFinished: true })
    }
  });
  }
  sendMessage(e){
    this.socket.emit('TYPING', { username: this.props.username, input: e.currentTarget.value });
  }
  sendFinshed() {

    this.socket.emit('FINISHED', { username: this.props.username });
  }
render() {
  let winner = '';
  if (this.state.meFinished) {
    winner = this.props.username;
  }
  if (this.state.challengerFinished) {
    
    winner = 'Challenger';
  }
  console.log(this.state.challengerFinished)
  return (
    <div className="game-room">
      <h2>GameRoom</h2>
      <h3>Function isOldEnoughToVote</h3>
      <p>Write a function called "isOldEnoughToVote". Given a number, in this case an age, 'isOldEnoughToVote' returns whether a person of this given age is old enough to legally vote in the United States. Notes:* The legal voting age in the United States is 18.</p>
      <div>{winner} Finished!</div>
      <h4>Player 1</h4>
      <div className='challenger-typing-area'>{this.state.challengerTyping}</div>
      <h4>Player 2</h4>
      <textarea className='my-typing-area' type="text" onChange={e => this.sendMessage(e)} rows="4" cols="50"/>
      <button className='finished-button' onClick={() => this.sendFinshed()}>Finished</button>
    </div>
		)
	}
}

const mapStateToProps = state => ({
    username: state.auth.currentUser.username
});

export default (connect(mapStateToProps)(GameRoom));