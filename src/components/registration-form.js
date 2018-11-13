import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/users';
import { createUserStats } from '../actions/userStats';
import { login } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';

const passwordLength = length({ min: 6, max: 72 }); // makes min password length 6 and max 72
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { name, username, password } = values;
    const user = { name, username, password };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(createUserStats(username)))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form
        className='registration-form'
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <label htmlFor="username">Username</label>
        <Field
            component={Input}
            type="text"
            name="username"
            validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="name">Name</label>
        <Field
            component={Input}
            type="text"
            name="name"
            validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="password">Password</label>
        <Field
            component={Input}
            type="password"
            name="password"
            validate={[required, passwordLength, isTrimmed]}
        />
        <label htmlFor="passwordConfirm">Confirm password</label>
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matchesPassword]}
        />
        <Link to="/" className="back">Back</Link>
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
          className="btn register"
        >
          Register
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
