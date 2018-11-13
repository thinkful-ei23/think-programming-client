import React from 'react';
import { shallow } from 'enzyme';
import Input from './input';

describe('<Input />', () => {
  it('Should render without crashing', () => {
    shallow(<Input />);
  });
});