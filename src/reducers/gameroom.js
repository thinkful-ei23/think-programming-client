import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_ERROR
} from '../actions/gameroom';

const initialState = {
  questions: {},
  loading: false,
  error: null
};

export default function gameRoomReducer(state = initialState, action) {
  if (action.type === FETCH_QUESTIONS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_QUESTIONS_SUCCESS) {
    return Object.assign({}, state, {
      questions: action.questions,
      loading: false,
      error: null
    });
  }
  else if (action.type === FETCH_QUESTIONS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}
