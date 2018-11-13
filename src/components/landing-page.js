import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// Styling
import './styles/landing-page.css';
import logo from './images/logo/TP-title-logo.jpg'

export class LandingPage extends Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="landing">
        <img src={logo} alt={"Think Programming"} />
        <div className="whoarewe">
          <Link to ="/aboutus" className="btn aboutus">WHO ARE WE?</Link>
        </div>
        <div className="directory">
          <Link to="/login" className="btn reg-log">Sign In</Link>
          <Link to="/register" className="btn reg-log">Register</Link>   
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);