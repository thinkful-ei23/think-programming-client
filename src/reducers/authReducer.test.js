/* global $ expect jest */
import authReducer from '../reducers/auth';
import {
  setAuthToken,
  clearAuth,
  authRequest,
  authSuccess,
  authError
} from '../actions/auth';

describe('Auth Reducers', () => {
  it('Should set the initial state when nothing is passed in.', () => {
    const state = authReducer(undefined, { type: '@@UNKNOWN' });
    expect(state).toEqual({
      authToken: null,
      currentUser: null,
      loading: false,
      error: null
    });
  });
  it('Should handle the set authToken action.', () => {
    const oldState = {
      authToken: null,
      currentUser: null,
      loading: false,
      error: null
    };
    const authToken = { authToken: 'akjfnaksdflnsdkf' };
    const state = authReducer(oldState, setAuthToken(authToken));
    expect(state.authToken).toEqual(authToken);
  });
  it('Should handle the clear auth action.', () => {
    const oldState = {
      authToken: null,
      currentUser: null,
      loading: false,
      error: null
    };
    const state = authReducer(oldState, clearAuth());
    expect(state.authToken).toEqual(null);
    expect(state.currentUser).toEqual(null);
  });

  it('Should handle the auth request action.', () => {
    const oldState = {
      authToken: null,
      currentUser: null,
      loading: false,
      error: null
    };
    const state = authReducer(oldState, authRequest());
    expect(state.loading).toEqual(true);
    expect(state.error).toEqual(null);
  });
  it('Should handle the auth success action.', () => {
    const oldState = {
      authToken: null,
      currentUser: null,
      loading: false,
      error: null
    };
    const user = { user: 'asdfojksdofasdljf' };
    const state = authReducer(oldState, authSuccess(user));
    expect(state.currentUser).toEqual(user);
    expect(state.loading).toEqual(false);
  });

  it('Should handle the auth error action.', () => {
    const oldState = {
      authToken: null,
      currentUser: null,
      loading: false,
      error: null
    };
    const error = { error: 400 };
    const state = authReducer(oldState, authError(error));
    expect(state.error).toEqual(error);
    expect(state.loading).toEqual(false);
  });
});
