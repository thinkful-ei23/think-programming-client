import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';

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
        <h2 className='registration-h2'>Registration</h2>
          <div className='registration-error'>{registrationError}</div>
          <RegistrationForm /> 
          <Link to="/">Login</Link>
      </div>
    );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    error: state.registration.error
});

export default connect(mapStateToProps)(RegistrationPage);