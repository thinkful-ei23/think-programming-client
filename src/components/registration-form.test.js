import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import RegistrationForm from './registration-form';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

const createMockStore = getState => {
  const middlewares = [];
  return configureStore(middlewares)(getState);
};

const mockStore = createMockStore();

describe('RegistrationForm', () => {
  it('should call onsubmit', () => {
    const onSubmit = stub().withArgs('name', 'username', 'password');
    const registrationComponent = mount(
      <Provider store={mockStore}>
        <BrowserRouter>
          <RegistrationForm handleSubmit={onSubmit} />
        </BrowserRouter>
      </Provider>
    );
    registrationComponent.simulate('submit');
    expect(onSubmit.calledOnce).toEqual(true);
  });
});
