import LoginForm from './login-form';
import React from 'react';
import { stub } from 'sinon';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// jest.unmock('redux-mock-store');

const createMockStore = getState => {
  const middlewares = [];
  return configureStore(middlewares)(getState);
};

const mockStore = createMockStore();

describe('LoginForm', () => {
  it('should call onsubmit', () => {
    const onSubmit = stub().withArgs('username', 'password');
    const loginComponent = mount(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginForm handleSubmit={onSubmit} />
        </BrowserRouter>
      </Provider>
    );
    loginComponent.simulate('submit');
    expect(onSubmit.calledOnce).toEqual(true);
  });
});
