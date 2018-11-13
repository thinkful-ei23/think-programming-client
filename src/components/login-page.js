import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './login-form';
import tplogo from './images/logo/TP-logo.jpg';
import './styles/login-page.css';

export class LoginPage extends React.Component {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    render() {
      if (this.props.loggedIn) {
        return <Redirect to="/dashboard" />;
      }
      let loginError = ''
      if (this.props.error) {
        loginError = this.props.error.message
      }
      return (
        <div className="home">
          <div className='login-h2'>
            <img src={tplogo} alt="Think Programming" />
            <h2>Let's Sign In!</h2>
          </div>
          <LoginForm /> 
          <div className='login-error'>{loginError}</div>  
        </div>
      );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    error: state.registration.error
});

export default connect(mapStateToProps)(LoginPage);