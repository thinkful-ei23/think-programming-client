import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_ERROR
} from '../actions/users';

const initialState = {
  loading: false,
  error: null
};

export default function registrationReducer(state = initialState, action) {
  if (action.type === REGISTER_USER_REQUEST) {
      return Object.assign({}, state, {
          loading: true,
          error: null
      });
  } else if (action.type === REGISTER_USER_ERROR) {
      return Object.assign({}, state, {
          loading: false,
          error: action.error
      });
  }
  return state;
}