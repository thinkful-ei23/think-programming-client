import React from 'react';
import { shallow } from 'enzyme';
import { RegistrationForm } from './registration-form';

describe('<RegistrationForm />', () => {
  it('Should render without crashing', () => {
    shallow(<RegistrationForm />);
  });
});