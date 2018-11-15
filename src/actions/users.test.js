import { REGISTER_USER_REQUEST, registerUserRequest, REGISTER_USER_ERROR, registerUserError} from './users';

describe('registerUserRequest', () => {
  it('Should return the action', () => {
    const action = registerUserRequest();
    expect(action.type).toEqual(REGISTER_USER_REQUEST);
  });
});
describe('registerUserError', () => {
  it('Should return the action', () => {
    const error = {}
    const action = registerUserError(error);
    expect(action.type).toEqual(REGISTER_USER_ERROR);
    expect(action.error).toEqual(error);
  });
});