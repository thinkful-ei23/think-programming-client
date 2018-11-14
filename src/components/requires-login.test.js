import React from 'react';
import { shallow } from 'enzyme';
import RequiresLogin from './requires-login';

describe('<RequiresLogin />', () => {
  it('Should render without crashing', () => {
    shallow(<RequiresLogin />);
  });
});