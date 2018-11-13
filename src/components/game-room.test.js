import React from 'react';
import { shallow } from 'enzyme';
import GameRoom from './game-room';
import store from './../store';

describe('<GameRoom />', () => {
  it('Should render without crashing', () => {
    shallow(<GameRoom store={store} />);
  });
});