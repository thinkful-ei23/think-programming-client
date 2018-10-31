import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';

class LoginPage extends React.Component {
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
        <h2 className='login-h2'>Login</h2>
          <div className='login-error'>{loginError}</div>
          <LoginForm /> 
          <Link to="/">Back</Link>
      </div>
    );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    error: state.registration.error
});

export default connect(mapStateToProps)(LoginPage);