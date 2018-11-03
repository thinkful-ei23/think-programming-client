import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
import { API_BASE_URL_SOCKET } from '../config';
import { fetchQuestions  } from '../actions/questions';
import requiresLogin from './requires-login';
import './styles/game-room.css';

class GameRoom extends Component {
  constructor(props) {
    super(props);
      this.state = {
        meSitting: false,
        playerArray: [],
        myTyping: '',
        challengerTyping: '',
        meFinished: false,
        challengerFinished: false,
      };
      this.socket = io.connect(`${API_BASE_URL_SOCKET}${this.props.match.url.substring(10,this.props.match.url.length)}`);

      this.socket.on('TYPING', incoming => {
        if ( incoming.username === this.props.username ) {
          this.setState({ myTyping: incoming.input });
        } else {
          this.setState({ challengerTyping: incoming.input });
        };
      });
      this.socket.on('PLAYERS', playerArray => {
        this.setState({ playerArray });
      });
      this.socket.on('LEAVE_GAME', playerArray => {
        this.setState({ playerArray });
      });
      this.socket.on('SIT', incoming => {
        if ( incoming.username === this.props.username ) {
          this.setState({
            meSitting: true
          });
        } 
      });
      this.socket.on('STAND', incoming => {
        if (incoming.username === this.props.username) {
          this.setState({
            meSitting: false
          });
        };
      });
      this.socket.on('FINISHED', incoming => {
        if (incoming.username === this.props.username) {
          this.setState({
            meFinished: true,
            challengerFinished: false
          });
        } else {
          this.setState({
            meFinished: false,
            challengerFinished: true });
        };
      });
  };
  getPlayerArray() {
    this.socket.emit('PLAYERS', { username: this.props.username });
  };
  sendMessage(e){
    this.socket.emit('TYPING', { username: this.props.username, input: e.currentTarget.value });
  };
  sendSitOrStand = (props) => {
    if (this.state.meSitting === false) {
      this.socket.emit('SIT', { username: this.props.username });
    } else {
      this.socket.emit('STAND', { username: this.props.username });
    };
  };
  sendFinished() {
    this.socket.emit('FINISHED', { username: this.props.username });
  };
  leaveGame() {
    this.socket.emit('LEAVE_GAME', this.props.username);
    this.getPlayerArray();
  }
  componentDidMount() {
    this.props.dispatch(fetchQuestions(this.props.match.params.value));
    this.getPlayerArray();
  };
  componentWillUnmount() {
    this.leaveGame();
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
    if (this.state.playerArray.length < 1) {
      questionTitle = 'Press Sit to Claim a Spot';
      question = '0 players are sitting.';
    } else if (this.state.playerArray.length === 1 && this.state.meSitting === false) {
      questionTitle = `${this.state.playerArray[0]} is ready to play.  Press Sit to Join`
    } else if (this.state.playerArray.length === 1 && this.state.meSitting === true) {
      questionTitle = `Hi ${this.state.playerArray[0]} Waiting for Challenger`
    } else if (this.props.questions[0] !== undefined & this.props.questions[0] !== null) {
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
          {(this.state.meFinished || this.state.challengerFinished) && <div>{winner} Finished!</div> }
        </div>
        <div className="challenger-text-editor">
          <h4>Challenger's text editor</h4>
          <div className='challenger-typing-area'>
            {this.state.challengerTyping}
          </div>
        </div>
        <div className="my-text-editor">
          <h4>My text editor</h4>
          <textarea className='my-typing-area' type="text" onChange={e => this.sendMessage(e)} placeholder="Type your code here"/>

          <button type="button" onClick={this.sendSitOrStand} className="btn-text-editor">
            {sitOrLeave}
          </button>
          {this.state.playerArray.length > 1 && <button className='btn-finished' onClick={() => this.sendFinished()}>
            Finished
          </button>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    username: state.auth.currentUser.username,
    questions: state.questions.questions
});

export default requiresLogin()(connect(mapStateToProps)(GameRoom));