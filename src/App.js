import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
/*===Import Components===*/
import HeaderBar from './components/header-bar';
import LandingPage from './components/landing-page';
import Dashboard from './components/dashboard';
import RegisterPage from './components/registration-page';
import LoginPage from './components/login-page';
import AboutUsPage from './components/about-us';
import GameRoom from './components/game-room';

import { refreshAuthToken } from './actions/auth';
export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }
  render() {
    return (
      <div className="app">
        <HeaderBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/aboutus" component={AboutUsPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
				<Route exact path="/gameroom0" component={GameRoom} />
				<Route exact path="/gameroom1" component={GameRoom} />
				<Route exact path="/gameroom2" component={GameRoom} />
				<Route exact path="/gameroom3" component={GameRoom} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
