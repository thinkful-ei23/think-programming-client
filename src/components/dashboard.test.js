import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './dashboard';
import store from './../store';

describe('<Dashboard />', () => {
  it('Should render without crashing', () => {
    shallow(<Dashboard store={store}/>);
  });
});