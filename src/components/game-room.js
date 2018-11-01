import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
import { API_BASE_URL_SOCKET } from '../config';
import './game-room.css';
import { fetchQuestions  } from '../actions/gameroom';

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
  this.socket.on('TYPING', (incoming) => {
    if (incoming.username === this.props.username) {
      this.setState({ myTyping: incoming.input });
    } else {
      this.setState({ challengerTyping: incoming.input })
    }
  });
  this.socket.on('FINISHED', (incoming) => {
    console.log('sent')
    if (incoming.username === this.props.username) {
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
  sendFinished() {

    this.socket.emit('FINISHED', { username: this.props.username });
  }
componentDidMount() {
    this.props.dispatch(fetchQuestions(this.props.match.params.value));
}

render() {
  console.log()
    let winner = '';
  if (this.state.meFinished) {
    winner = this.props.username;
  }
  if (this.state.challengerFinished) {

    winner = 'Challenger';
  }
  let questionTitle = '';
  if (this.props.questions[0] !== undefined & this.props.questions[0] !== null) {
  questionTitle = this.props.questions[0].title;  
  }
  return (
    <div className="game-room">
      <Link to='/dashboard'>Dashboard</Link>
      <h2>GameRoom</h2>
      <h3>{questionTitle}</h3>
      <p>Write a function called "isOldEnoughToVote". Given a number, in this case an age, 'isOldEnoughToVote' returns whether a person of this given age is old enough to legally vote in the United States. Notes:* The legal voting age in the United States is 18.</p>
      <div>{winner} Finished!</div>
      <h4>Player 1</h4>
      <div className='challenger-typing-area'>{this.state.challengerTyping}</div>
      <h4>Player 2</h4>
      <textarea className='my-typing-area' type="text" onChange={e => this.sendMessage(e)} rows="4" cols="50"/>
      <button className='finished-button' onClick={() => this.sendFinished()}>Finished</button>
    </div>
		)
	}
}

const mapStateToProps = state => ({
    username: state.auth.currentUser.username,
    questions: state.gameRoom.questions
});

export default (connect(mapStateToProps)(GameRoom));
