import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyStats } from '../actions/my-stats';
import requiresLogin from './requires-login';

import './styles/my-stats.css';

class MyStats extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchMyStats());
  }
    render() {
      return (
        <div className="my-stats">
          <Link to="/dashboard" className="dashboard-link">
            Back to Dashboard
          </Link>
          <div className="my-stats-container">
            <h1>{this.props.username} Stats</h1>
            <div className='stats-container'>
              <div className='points-container'>
                <p>Total Points: {this.props.myStats ?this.props.myStats.totalPoints : 0}</p>
                <p>JavaScript Points: {this.props.myStats ?this.props.myStats.javascriptTotalPoints : 0}</p>
                <p>HTML Points: {this.props.myStats ?this.props.myStats.htmlTotalPoints : 0}</p>
                <p>CSS Points: {this.props.myStats ?this.props.myStats.cssTotalPoints : 0}</p>
                <p>DSA Points: {this.props.myStats ?this.props.myStats.dsaTotalPoints : 0}</p>
              </div>
              <div className='percentage-container'>
                <p>Correct Percentage: {this.props.myStats ?this.props.myStats.correctPercentage : 0}%</p>
                <p>JavaScript Correct Percentage: {this.props.myStats ?this.props.myStats.javascriptCorrectPercentage : 0}%</p>
                <p>HTML Correct Percentage: {this.props.myStats ?this.props.myStats.htmlCorrectPercentage : 0}%</p>
                <p>CSS Correct Percentage: {this.props.myStats ?this.props.myStats.cssCorrectPercentage : 0}%</p>
                <p>DSA Correct Percentage: {this.props.myStats ?this.props.myStats.dsaCorrectPercentage : 0}%</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    username: state.auth.currentUser.username,
    myStats: state.myStats.myStats
});

export default requiresLogin()(connect(mapStateToProps)(MyStats));