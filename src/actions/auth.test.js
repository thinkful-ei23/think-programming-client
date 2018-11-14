import { AUTH_REQUEST, authRequest, AUTH_SUCCESS, authSuccess, AUTH_ERROR, authError, setAuthToken, SET_AUTH_TOKEN, clearAuth, CLEAR_AUTH } from './auth';

describe('authRequest', () => {
    it('Should return the action', () => {
        const action = authRequest();
        expect(action.type).toEqual(AUTH_REQUEST);
    });
});
describe('authSuccess', () => {
  it('Should return authToken and User', () => {
    const user = {};
    const action = authSuccess(user);
    expect(action.type).toEqual(AUTH_SUCCESS);
    expect(action.currentUser).toEqual(user);
  });
});
describe('authError', () => {
  it('Should return error', () => {
    const error = {};
    const action = authError(error);
    expect(action.type).toEqual(AUTH_ERROR);
    expect(action.error).toEqual(error);
  });
});
describe('setAuthToken', () => {
  it('Should return error', () => {
    const authToken = 'asdf;lkj';
    const action = setAuthToken(authToken);
    expect(action.type).toEqual(SET_AUTH_TOKEN);
    expect(action.authToken).toEqual(authToken);
  });
});
describe('clearAuth', () => {
  it('Should clear Auth Token', () => {
    const action = clearAuth();
    expect(action.type).toEqual(CLEAR_AUTH);
  });
});