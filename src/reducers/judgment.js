import {
  SEND_JUDGMENT_REQUEST, SEND_JUDGMENT_SUCCESS, SEND_JUDGMENT_ERROR, CLEAR_JUDGMENT_REDUCER
} from '../actions/judgement';

const initialState = {
  judgement: null,
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
      judgement: action.judgement,
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
  else if (action.type === CLEAR_JUDGMENT_REDUCER) {
    return Object.assign({}, state, {
      judgement: null,
      loading: false,
      error: null
    });
  }
  return state;
}