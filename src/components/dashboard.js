import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import './styles/dashboard.css';

class Dashboard extends Component {
  render() {
    let questionTypes = [ ['jsQuestions','JavaScript'], ['htmlQuestions', 'HTML'], ['cssQuestions', 'CSS'], ['dsaQuestions', 'Data Structures & Algorithms' ]];
    let rooms = questionTypes.map((questionArray, i) => {
      return (
        <Link className={`room-link-container-${i}`} key={i} to={`/gameroom${i}/${questionArray[0]}`}>
          {questionArray[1]}
        </Link>
      );
    });
    return (
      <div className="dashboard">
        <h2>Challenge Rooms</h2>
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
