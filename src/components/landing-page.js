import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// Styling
import './components.css';
import logo from './images/logo/TP-title-logo.jpg'
class LandingPage extends Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="landing">
        <img src={logo} alt={"Think Programming"} />
        {/* <h2>Think <br/ >Programming</h2> */}
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        <Link to="/login">Sign In</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);