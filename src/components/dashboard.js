import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_BASE_URL_SOCKET } from '../config';
import io from "socket.io-client";
import requiresLogin from './requires-login';
import './styles/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
      this.state = {
        totalUserCount: 0,
        allUsers: {}
      }
    this.socket = io.connect(`${API_BASE_URL_SOCKET}/dashboard`);
    
    this.socket.on('USERS', userArray => {
      let totalUsers = userArray.length;
      this.setState({totalUserCount: totalUsers});
    });
    
    this.socket.on('ALL_PLAYERS', incomingRoomObject => {
      console.log('getAllUsers')
      this.setState({allUsers: incomingRoomObject})
    });
  }
  sendNewUser() {
    this.socket.emit('USERS', this.props.username)
  }
  getAllUsers() {
    this.socket.emit('ALL_PLAYERS', this.props.username) 
  }
  componentDidMount() {
    this.sendNewUser();
    this.getAllUsers();
  }

  render() {
    let questionTypes = [ ['jsQuestions','JavaScript', 'jsPlayers'], ['htmlQuestions', 'HTML', 'htmlPlayers'], ['cssQuestions', 'CSS', 'cssPlayers'], ['dsaQuestions', 'Data Structures & Algorithms', 'dsaPlayers']];
    let rooms = questionTypes.map((questionArray, i) => {
      return (
        <Link className={`room-link-container-${i}`} key={i} to={`/gameroom${i}/${questionArray[0]}`}>
          <p><span className="room-title">{questionArray[1]}</span><span className="users-ready">{this.state.allUsers[questionArray[2]] ? this.state.allUsers[questionArray[2]].length : 0} of 2 Players Ready</span></p>
        </Link>
      );
    });
    let coders = 'Coder';
    if (this.state.totalUserCount > 1) {
      coders = 'Coders';
    }
    return (
      <div className="dashboard fade">
        <h2>Challenge Rooms</h2>
        <h4>{this.state.totalUserCount} {coders} Online</h4>
        <div className="gamerooms">
          {rooms}
        </div>
      </div>
    );
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

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
