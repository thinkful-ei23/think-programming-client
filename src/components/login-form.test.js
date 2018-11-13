import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from './login-form';

describe('<LoginForm />', () => {
  it('Should render without crashing', () => {
    shallow(<LoginForm />);
  });
});