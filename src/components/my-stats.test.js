import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import MyStats from './my-stats';
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('<MyStats />', () => {
  // Initialize mockstore with empty state
  const initialState = {}
  const store = mockStore(initialState)
  it('Should render without crashing', () => {
    shallow(<Provider store={store}><MyStats  /></Provider>);
  });
});
