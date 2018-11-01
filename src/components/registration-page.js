import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';

import './styles/registration-page.css';
import tplogo from './images/logo/TP-logo.jpg';

class RegistrationPage extends React.Component {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    let registrationError = ''
    if (this.props.error) {
      registrationError = this.props.error.message
    }
    return (
      <div className="home">
        <div className='login-h2'>
          <img src={tplogo} alt="Think Programming" />
          <h2>Let's Register!</h2>
        </div>
        <RegistrationForm /> 

        <div className='registration-error'>{registrationError}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    error: state.registration.error
});

export default connect(mapStateToProps)(RegistrationPage);