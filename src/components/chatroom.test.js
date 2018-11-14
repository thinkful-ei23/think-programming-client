import React from 'react';
import { shallow } from 'enzyme';
import Chatroom from './chatroom';
import store from '../store';

describe('<Chatroom />', () => {
  it('Should render without crashing', () => {
    shallow(<Chatroom store={store} />);
  });
});