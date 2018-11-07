import {
  SEND_JUDGMENT_REQUEST, SEND_JUDGMENT_SUCCESS, SEND_JUDGMENT_ERROR
} from '../actions/judgement';

const initialState = {
  loading: false,
  error: null
};

export default function judgmentReducer(state = initialState, action) {
  if (action.type === SEND_JUDGMENT_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === SEND_JUDGMENT_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null
    });
  }
  else if (action.type === SEND_JUDGMENT_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}