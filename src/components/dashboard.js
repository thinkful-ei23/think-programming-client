import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_BASE_URL_SOCKET } from '../config';
import io from "socket.io-client";
import requiresLogin from './requires-login';
import Footer from './footer';
import './styles/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
      this.state = {
        totalUserCount: 0,
        allUsers: {},
        displayToggle: '',
        onlineUsers: []
      }
    this.socket = io.connect(`${API_BASE_URL_SOCKET}/dashboard`);
    
    this.socket.on('USERS', userArray => {
      if (!this.isCancelled) { 
        let totalUsers = userArray.length;
        this.setState({
          totalUserCount: totalUsers,
          onlineUsers: userArray
        });
      }
    });
    
    this.socket.on('ALL_PLAYERS', incomingRoomObject => {
      if (!this.isCancelled) {
        this.setState({
          allUsers: incomingRoomObject
        })
      }
    });
  }

  sendNewUser() {
    this.socket.emit('USERS', this.props.username)
  }
  getAllUsers() {
    this.socket.emit('ALL_PLAYERS', this.props.username) 
  }

  receiveOnlineUsers() {
    this.socket.emit('LIST_USERS')
  }

  componentDidMount() {
    this.sendNewUser();
    this.getAllUsers();
    this.receiveOnlineUsers();
  }
  
  componentWillUnmount() {
    this.isCancelled = true;
    this.receiveOnlineUsers();
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.displayToggle === '') {
      this.setState({
        displayToggle: 'show'
      });
    } else {
      this.setState({
        displayToggle: ''
      });
    }
  }

  render() {
    let questionTypes = [ ['jsQuestions','JavaScript', 'jsPlayers'], ['htmlQuestions', 'HTML', 'htmlPlayers'], ['cssQuestions', 'CSS', 'cssPlayers'], ['dsaQuestions', 'Data Structures & Algorithms', 'dsaPlayers']];
    let disabledlink = '';
    let rooms = questionTypes.map((questionArray, i) => {
      if (this.state.allUsers[questionArray[2]]) {
        if (this.state.allUsers[questionArray[2]].length === 2) {
          disabledlink = 'disabled-link';
        }
        else {
          disabledlink = '';
        }
      }
      return (
        <Link className={`room-link-container-${i} ${disabledlink}`} key={i} to={`/gameroom${i}/${questionArray[0]}`}>
          <p><span className="room-title">{questionArray[1]}</span><span className="users-ready">{this.state.allUsers[questionArray[2]] ? (this.state.allUsers[questionArray[2]].length === 2 ? `This room is full. Please wait or try another room` : `${this.state.allUsers[questionArray[2]].length} of 2 Players Ready`) : '0 of 2 Players Ready'}</span></p>
        </Link>
      );
    });
    let coders = 'Coder';
    if (this.state.totalUserCount > 1) {
      coders = 'Coders';
    }

    let onlineUsers = this.state.onlineUsers;
    const listUsers = onlineUsers.map((onlineUser, i) => {
      return (
        <li key={i}>{onlineUser}</li>
      )
    });

    return (
      <div className="dashboard">
        <h2>Challenge Rooms</h2>
        <div className="menu-bar">
          <span className="menu-bar-links" onClick={(e) => this.handleClick(e)}>{this.state.totalUserCount} {coders} Online</span>
          <div id={this.state.displayToggle} className="dropdown-content">
            {listUsers}
          </div>
          <Link to='/instructions' className='menu-bar-links'>
              Instructions
          </Link>
          <Link to="/mystats" className="menu-bar-links">
              My Stats
          </Link>
          <Link to="/chatroom" className="menu-bar-links">
              Chatroom
          </Link>        
        </div> 
        <div className="gamerooms">
          {rooms}
        </div>
        <Footer />
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
