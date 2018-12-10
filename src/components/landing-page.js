import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Footer from './footer';
// Styling
import './styles/landing-page.css';
import logo from './images/logo/TP-logo.png';

export class LandingPage extends Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="landing">
        <img src={logo} alt={'Think Programming'} />
        <h1 className="app-name">Think Programming</h1>
        <h3 className="oneliner">Live Player vs Player Coding Challenges!</h3>
        <div className="whoarewe">
          <Link to="/aboutus" className="btn aboutus">
            About Us
          </Link>
        </div>
        <div className="directory">
          <Link to="/login" className="btn reg-log">
            Sign In
          </Link>
          <Link to="/register" className="btn reg-log">
            Register
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
