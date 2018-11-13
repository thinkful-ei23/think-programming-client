import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from './login-page';

describe('<LoginPage />', () => {
  it('Should render without crashing', () => {
    shallow(<LoginPage />);
  });
});