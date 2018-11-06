import {
  FETCH_ANSWERS_REQUEST, FETCH_ANSWERS_SUCCESS, FETCH_ANSWERS_ERROR
} from '../actions/answers';

const initialState = {
  answers: '',
  loading: false,
  error: null
};

export default function queestionsReducer(state = initialState, action) {
  if (action.type === FETCH_ANSWERS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_ANSWERS_SUCCESS) {
    return Object.assign({}, state, {
      answers: action.answer,
      loading: false,
      error: null
    });
  }
  else if (action.type === FETCH_ANSWERS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}