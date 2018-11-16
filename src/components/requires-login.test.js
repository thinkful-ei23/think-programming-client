// import React from 'react';
// import { shallow } from 'enzyme';
// import RequiresLogin from './requires-login';

// describe('<RequiresLogin />', () => {
//   it('Should render without crashing', () => {
//     shallow(<RequiresLogin />);
//   });
// });
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { Switch, MemoryRouter, Route } from 'react-router-dom';

import requiresLogin from './requires-login';

class MockComponent extends Component {
  render() {
    return (<div className="mock">Mock Component</div>);
  }
}

describe('<RequiresLogin />', () => {

  it('should render the component when loggedIn', () => {
    const mockStore = {
      subscribe: function () {jest.fn()},
      dispatch: function () {jest.fn()},
      getState: function () {
        return {
          auth: {
            loading: false,
            currentUser: { user: 'exists' },
            error: null,
          }
        };
      },
    }
    const RequiresLoginComponent = requiresLogin()(MockComponent);
    const wrapper = mount(<RequiresLoginComponent store={mockStore} />);
    expect(wrapper.find('.mock').exists()).toEqual(true);
  });
  it('should render a loading message when authenticating', () => {
    const mockStore = {
      subscribe: function () {jest.fn()},
      dispatch: function () {jest.fn()},
      getState: function () {
        return {
          auth: {
            loading: true,
            currentUser: { user: 'exists' },
            error: null,
          }
        };
      },
    }
    const RequiresLoginComponent = requiresLogin()(MockComponent);
    const wrapper = mount(<RequiresLoginComponent store={mockStore} />);
    expect(wrapper.find('div').text()).toEqual('Logging in...');
  });
  it('should redirect to "/" when currentUser is null', () => {
    const mockStore = {
      subscribe: function () {jest.fn()},
      dispatch: function () {jest.fn()},
      getState: function () {
        return {
          auth: {
            loading: false,
            currentUser: null,
            error: null,
          }
        };
      },
    }
    const RequiresLoginComponent = requiresLogin()(MockComponent);
    const wrapper = mount(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`/test`]}>
          <Route component={RequiresLoginComponent} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('Redirect')).toHaveLength(1);
    expect(wrapper.find('Router').prop('history').location.pathname).toBe('/');
  });
  it('should redirect to "/" when error is not null', () => {
    const mockStore = {
      subscribe: function () {jest.fn()},
      dispatch: function () {jest.fn()},
      getState: function () {
        return {
          auth: {
            loading: false,
            currentUser: null,
            error: 'non-null error',
          }
        };
      },
    }
    const RequiresLoginComponent = requiresLogin()(MockComponent);
    const wrapper = mount(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`/test`]}>
          <Switch>
            <Route component={RequiresLoginComponent} />
          </Switch>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('Redirect')).toHaveLength(1);
    expect(wrapper.find('Router').prop('history').location.pathname).toBe('/');
  });
});