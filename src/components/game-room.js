import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { API_BASE_URL_SOCKET } from '../config';
// import brace from 'brace';
import AceEditor from 'react-ace';
// IMPORT ACTIONS
import { fetchQuestions  } from '../actions/questions';
import { inGameRoom } from '../actions/game-room';
import { fetchAnswers } from '../actions/answers';
import { sendJudgment } from '../actions/judgement';
import requiresLogin from './requires-login';
import './styles/game-room.css';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/markdown';
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
      currentQuestionIndex: 0,
      room: this.props.match.url.substring(11),
      answerError: null,
      answerMessage: null,
      message: null
    };

    this.socket = io.connect(
      `${API_BASE_URL_SOCKET}${this.props.match.url.substring(
        10,
        this.props.match.url.length
      )}`
    );

    this.socket.on('TYPING', incoming => {
      if (!this.isCancelled) {
        if (incoming.username === this.props.username) {
          this.setState({ myTyping: incoming.input });
        } else {
          this.setState({ challengerTyping: incoming.input });
        }
      }
    });

    this.socket.on('PLAYERS', playerArray => {
      if (!this.isCancelled) {
        this.setState({ playerArray });
      }
    });

    this.socket.on('LEAVE_GAME', playerArray => {
      if (!this.isCancelled) {
        return Promise.all([
          this.setState({ playerArray, currentQuestionIndex: 0 })
        ]).then(() => {
          this.props.dispatch(fetchQuestions(this.props.match.params.value, 0));
        });
      };
    });
      this.socket.on('SIT', incoming => {
        if (!this.isCancelled) {
          if ( incoming.username === this.props.username ) {
            this.setState({
              meSitting: true
            });
          };
        }
      });
   
    this.socket.on('STAND', incoming => {
      if (!this.isCancelled) {
        if (incoming.username === this.props.username) {
          this.setState({
            meSitting: false
          });
        }
      }
    });

    this.socket.on('FINISHED', incoming => {
      if (!this.isCancelled) {
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
      }
    });
    this.socket.on('ANSWERED', answerObject => {
      if (!this.isCancelled) {
        this.setState({
          answerError: answerObject.answerError,
          answerMessage: answerObject.answerMessage
        });
      }
    });
    this.socket.on('RESET', incoming => {
      if (!this.isCancelled) {
        this.setState({
          meFinished: false,
          challengerFinished: false,
          currentQuestionIndex: 0
        });
      }
    });
    this.socket.on('WRONG', incoming => {
      if (!this.isCancelled) {
        if (this.state.meFinished) {
          this.setState({
            meFinished: false
          });
        } else if (this.state.challengerFinished) {
          this.setState({
            challengerFinished: false
          });
        }
      }
    });
    this.socket.on('APPROVE', newIndex => {
      if (!this.isCancelled) {
        return Promise.all([
          this.setState({
            currentQuestionIndex: newIndex,
            meFinished: false,
            challengerFinished: false,
            meTyping: '',
            challengerTyping: ''
          })
        ]).then(() => {
          this.props.dispatch(
            fetchQuestions(this.props.match.params.value, newIndex)
          );
        });
      }
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
    })
    .then(() => {
      this.isCancelled = true;
    })
  };
  componentWillReceiveProps(nextProps) {
    const { answerError, answerMessage } = nextProps;
    if (answerError !== this.state.answerError) {
      let answerObj = { answerError, answerMessage };
      this.socket.emit('ANSWERED', answerObj)
    };
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
    if (this.state.meTyping.length === 0) {
      this.setState({
        message: 'Must have code to press Finished Button'  
      });
    } else {
      let room = this.props.match.url.substring(
        10);
      this.socket.emit('FINISHED', { username: this.props.username });
      this.props.dispatch(fetchAnswers(room, this.state.meTyping, this.state.currentQuestionIndex));
      this.setState({ message: null });
    } 
  };
  sendReset = () => {
    this.socket.emit('RESET', this.props.username);
  };
  sendDeny = () => {
    if (this.state.answerError === true) {
      this.props.dispatch(sendJudgment(this.props.match.url.substring(11), 'correct'))
      // dispatch I am correct by approving and get some points
      this.socket.emit('WRONG', this.props.username);
    } else {
      this.props.dispatch(sendJudgment(this.props.match.url.substring(11), 'incorrect'))
      // dispatch I am wrong in my judgement I should lose points
      this.socket.emit('APPROVE', this.state.currentQuestionIndex);
    }
  };
  sendApprove = () => {
    if (this.state.answerError === false) {
      this.props.dispatch(sendJudgment(this.props.match.url.substring(11), 'correct'))
      // dispatch I am correct by approving and get some points
      this.socket.emit('APPROVE', this.state.currentQuestionIndex);
    } else {
      this.props.dispatch(sendJudgment(this.props.match.url.substring(11), 'incorrect'))
      // dispatch I am wrong in my judgement I should lose points
      this.socket.emit('WRONG', this.props.username);
    }
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
    let roomMode = '';
    if (this.state.room === 'jsQuestions') {
      roomMode = 'javascript';
    } else if (this.state.room === 'htmlQuestions') {
      roomMode = 'html';
    } else if (this.state.room === 'cssQuestions') {
      roomMode = 'css';
    } else if (this.state.room === 'dsaQuestions') {
      roomMode = 'markdown';
    }
    let message = this.state.message;
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
          <div className="finish-button-column">
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
            {(this.state.answerMessage !== undefined) && <div className='message-column'>{message}</div>}
          </div>
        </div>
        <div className="my-text-editor">
          <h4>My text editor</h4>
          <AceEditor
            value={this.state.meTyping}
            onChange={e => this.onTyping(e)}
            mode={roomMode}
            theme="solarized_dark"
            width="100%"
            height="70%"
            fontSize="16px"
            tabSize={2}
            editorProps={{ $blockScrolling: true }}
            wrapEnabled={true}
          />
        </div>
        <div className="challenger-text-editor">
          <h4>Challenger's text editor</h4>
          <AceEditor
            value={this.state.challengerTyping}
            mode={roomMode}
            readOnly={true}
            theme="solarized_dark"
            width="100%"
            height="70%"
            fontSize="16px"
            tabSize={2}
            editorProps={{ $blockScrolling: true }}
            wrapEnabled={true}
          />
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  questions: state.questions.questions,
  answerError: state.answers.answerError,
  answerMessage: state.answers.answerMessage
});

export default requiresLogin()(connect(mapStateToProps)(GameRoom));
