import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { API_BASE_URL_SOCKET } from '../config';
import brace from 'brace';
import AceEditor from 'react-ace';
import { fetchQuestions  } from '../actions/questions';
import { inGameRoom } from '../actions/game-room';
import { fetchAnswers } from '../actions/answers';
import requiresLogin from './requires-login';
import './styles/game-room.css';
import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';
class GameRoom extends Component {
  // HERE IS THE CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      meSitting: false,
      playerArray: [],
      myTyping: '',
      meTyping: '',
      challengerTyping: '',
      meFinished: false,
      challengerFinished: false,
      currentQuestionIndex: 0
    };

    this.socket = io.connect(
      `${API_BASE_URL_SOCKET}${this.props.match.url.substring(
        10,
        this.props.match.url.length
      )}`
    );

    this.socket.on('TYPING', incoming => {
      if (incoming.username === this.props.username) {
        this.setState({ myTyping: incoming.input });
      } else {
        this.setState({ challengerTyping: incoming.input });
      }
    });

    this.socket.on('PLAYERS', playerArray => {
      this.setState({ playerArray });
    });

    this.socket.on('LEAVE_GAME', playerArray => {
      return Promise.all([
        this.setState({ playerArray, currentQuestionIndex: 0 })
      ]).then(() => {
        this.props.dispatch(fetchQuestions(this.props.match.params.value, 0));
      });
    });
      this.socket.on('SIT', incoming => {
        if ( incoming.username === this.props.username ) {
          this.setState({
            meSitting: true
          });
        };
      });
   
    this.socket.on('STAND', incoming => {
      if (incoming.username === this.props.username) {
        this.setState({
          meSitting: false
        });
      }
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
          challengerFinished: true
        });
      }
    });
    this.socket.on('RESET', incoming => {
      this.setState({
        meFinished: false,
        challengerFinished: false,
        currentQuestionIndex: 0
      });
    });
    this.socket.on('WRONG', incoming => {
      if (this.state.meFinished) {
        this.setState({
          meFinished: false
        });
      } else if (this.state.challengerFinished) {
        this.setState({
          challengerFinished: false
        });
      }
    });
    this.socket.on('APPROVE', newIndex => {
      return Promise.all([
        this.setState({
          currentQuestionIndex: newIndex,
          meFinished: false,
          challengerFinished: false
        })
      ]).then(() => {
        this.props.dispatch(
          fetchQuestions(this.props.match.params.value, newIndex)
        );
      });
    });
  }
  // HERE ARE THE METHODS
  // Life Cycle - Methods
  componentDidMount() {
    this.props.dispatch(fetchQuestions(this.props.match.params.value, 0));
    this.getPlayerArray();
  };
  componentDidUpdate() {
    this.props.dispatch(inGameRoom(this.props.match.params.value, this.state.playerArray));
  };
  componentWillUnmount() {
    return Promise.all([this.leaveGame()])
    .then(() => {
      this.props.dispatch(inGameRoom(this.props.match.params.value, this.state.playerArray));
    });
  };
// Socket Methods
  getPlayerArray() {
    this.socket.emit('PLAYERS', { username: this.props.username });
  }
  leaveGame() {
    this.socket.emit('LEAVE_GAME', this.props.username);
    this.getPlayerArray();
  }
  sendTyping(e) {
    this.socket.emit('TYPING', {
      username: this.props.username,
      input: e.currentTarget.value
    });
  }
  sitStand = () => {
    if (this.state.meSitting === false) {
      this.socket.emit('SIT', { username: this.props.username });
    } else {
      this.socket.emit('STAND', { username: this.props.username });
    };
  };
  sendFinished() {
    let room = this.props.match.url.substring(
      10);
    this.socket.emit('FINISHED', { username: this.props.username });
    this.props.dispatch(fetchAnswers(room, this.state.meTyping, this.state.currentQuestionIndex));
  };
  sendReset = () => {
    this.socket.emit('RESET', this.props.username);
  };
  sendDeny = () => {
    this.socket.emit('WRONG', this.props.username);
  };
  sendApprove = () => {
    this.socket.emit('APPROVE', this.state.currentQuestionIndex);
  };
  onTyping(e) {
    this.setState({meTyping: e})
    this.socket.emit('TYPING', {
      username: this.props.username,
      input: e
    });
  };
  // HERE IS THE RENDER METHOD
  render() {
    // Variable Logic for rendering
    let winner = '';
    if (this.state.meFinished) {
      winner = this.props.username;
    }
    if (this.state.challengerFinished) {
      winner = 'Challenger';
    };
    let questionTitle = '';
    let question = '';
    if (this.state.playerArray.length < 1) {
      questionTitle = 'Press Sit to Claim a Spot';
      question = '0 players are sitting.';
    } else if (
      this.state.playerArray.length === 1 &&
      this.state.meSitting === false
    ) {
      questionTitle = `${
        this.state.playerArray[0]
      } is ready to play.  Press Sit to Join`;
      question = '';
    } else if (
      this.state.playerArray.length === 1 &&
      this.state.meSitting === true
    ) {
      questionTitle = `Hi ${this.state.playerArray[0]}! Waiting for Challenger To Join`;
      question = '';
    } else if (this.state.meFinished) {
      questionTitle = `${
        this.props.username
      } is Finished. Waiting For Challenger To Check Answer`;
      question = '';
    } else if (this.state.challengerFinished) {
      questionTitle =
        'Challenger Has Finshed. Approve or Deny Their Answer';
      question = '';
    } else if (
      (this.props.questions !== undefined) &
      (this.props.questions !== null)
    ) {
      questionTitle = this.props.questions.title;
      question = this.props.questions.question;
    };
    let sitOrLeave = 'Sit';
    if (this.state.meSitting === true) {
      sitOrLeave = 'Stand';
    };
    return (
      <div className="game-room">
        <Link to="/dashboard" className="dashboard-link">
          Back to Dashboard
        </Link>
        <h2>{this.props.match.params.value}</h2>
        <div className="question-container">
          <h3>{questionTitle}</h3>
          <p>{question}</p>
        </div>
        <div className="winner">
          {(this.state.meFinished || this.state.challengerFinished) && <p>{winner} Finished!</p>}
          {this.state.challengerFinished && 
            <div className='verify-buttons'>
              <button className='approve-button' onClick={this.sendApprove}>Approve</button>
              <button className='deny-button' onClick={this.sendDeny}>Try Again</button>
            </div>
          }
        </div>
        <div className="challenger-text-editor">
          <h4>Challenger's text editor</h4>
          <AceEditor
            value={this.state.challengerTyping}
            mode="javascript"
            readOnly={true}
            theme="solarized_dark"
            width="100%"
            height="80%"
            fontSize="16px"
            tabSize="2"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        <div className="my-text-editor">
          <h4>My text editor</h4>
          <AceEditor
            value={this.state.meTyping}
            onChange={e => this.onTyping(e)}
            mode="javascript"
            theme="solarized_dark"
            width="100%"
            height="80%"
            fontSize="16px"
            tabSize="2"
            editorProps={{ $blockScrolling: true }}
          />
          {this.state.meFinished === false &&
            this.state.challengerFinished === false && (
              <button
                type="button"
                onClick={this.sitStand}
                className="btn-text-editor"
              >
                {sitOrLeave}
              </button>
            )}
          {this.state.playerArray.length > 1 &&
            (this.state.meFinished === false &&
              this.state.challengerFinished === false) && (
              <button
                className="btn-finished"
                onClick={() => this.sendFinished()}
              >
                Finished
              </button>
            )}
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  questions: state.questions.questions
});

export default requiresLogin()(connect(mapStateToProps)(GameRoom));
