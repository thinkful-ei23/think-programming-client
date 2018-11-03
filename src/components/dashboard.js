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
        totalUserCount: 0
      }
    this.socket = io.connect(`${API_BASE_URL_SOCKET}/dashboard`);
    this.socket.on('USERS', userArray => {
      let totalUsers = userArray.length;
      this.setState({totalUserCount: totalUsers});
    });
  }
  sendNewUser() {
    this.socket.emit('USERS', this.props.username)
  }
  componentDidMount() {
    this.sendNewUser();
  }
  render() {
    let questionTypes = [ ['jsQuestions','JavaScript'], ['htmlQuestions', 'HTML'], ['cssQuestions', 'CSS'], ['dsaQuestions', 'Data Structures & Algorithms' ]];
    let rooms = questionTypes.map((questionArray, i) => {
      return (
        <Link className={`room-link-container-${i}`} key={i} to={`/gameroom${i}/${questionArray[0]}`}>
          {questionArray[1]}
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
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
