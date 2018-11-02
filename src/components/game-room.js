import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
import { API_BASE_URL_SOCKET } from '../config';
import { fetchQuestions  } from '../actions/questions';
import { enterGameRoom } from '../actions/game-room';

import './styles/game-room.css';
class GameRoom extends Component {
  constructor(props) {
    super(props);
      this.state = {
        meSitting: false,
        players: 0,
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
  this.socket.on('SIT', (incoming) => {
    let currentPlayers = this.state.players;
    if (incoming.username === this.props.username) {
      this.setState({
        meSitting: true,
        players: currentPlayers += 1
      });
    } else {
      this.setState({
        players: currentPlayers += 1 
      })
    }
  });
  this.socket.on('LEAVE', (incoming) => {
    let currentPlayers = this.state.players;
    if (incoming.username === this.props.username) {
      this.setState({
        meSitting: false,
        players: currentPlayers -= 1
      });
    } else {
      this.setState({
        players: currentPlayers -= 1 
      })
    }
  });
  }
  sendMessage(e){
    this.socket.emit('TYPING', { username: this.props.username, input: e.currentTarget.value });
  }
  sendSitOrStand = (props) => {
    console.log(this.state)
    if (this.state.meSitting === false) {
      this.socket.emit('SIT', { username: this.props.username });
    } else {
      this.socket.emit('LEAVE', { username: this.props.username })
    }
  }
  sendFinished() {
    this.socket.emit('FINISHED', { username: this.props.username });
  }
componentDidMount() {
    this.props.dispatch(fetchQuestions(this.props.match.params.value));
}

render() {
    let winner = '';
  if (this.state.meFinished) {
    winner = this.props.username;
  }
  if (this.state.challengerFinished) {

    winner = 'Challenger';
  }
  let questionTitle = '';
  let question = '';
  if (this.props.questions[0] !== undefined & this.props.questions[0] !== null) {
  questionTitle = this.props.questions[0].title;
  question = this.props.questions[0].question;
  }
  let sitOrLeave = 'Sit';
  if (this.state.meSitting === true) {
    sitOrLeave = 'Stand';
  }
  return (
    <div className="game-room">

      <Link to='/dashboard' className="dashboard-link">
        Back to Dashboard
      </Link>
      <h2>{this.props.match.params.value}</h2>

      <div className="question-container">
        <h3>{questionTitle}</h3>
        <p>{question}</p>
        <div>{winner} Finished!</div>
      </div>
        
      <div className="challenger-text-editor">
        <h4>Challenger's text editor</h4>
        <div className='challenger-typing-area'>
          {this.state.challengerTyping}
        </div>
        <button type="button" className="btn-text-editor">Sit</button>
      </div>
      
      <div className="my-text-editor">
        <h4>My text editor</h4>
        <textarea className='my-typing-area' type="text" onChange={e => this.sendMessage(e)} placeholder="Type your code here"/>

        <button type="button" onClick={this.sendSitOrStand} className="btn-text-editor">
          {sitOrLeave}
        </button>
        <button className='btn-finished' onClick={() => this.sendFinished()}>
          Finished
        </button>
      </div>
    
    </div>
		)
	}
}

const mapStateToProps = state => ({
    username: state.auth.currentUser.username,
    questions: state.questions.questions
});

export default (connect(mapStateToProps)(GameRoom));
