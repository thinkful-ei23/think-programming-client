import {
  FETCH_MY_STATS_REQUEST, FETCH_MY_STATS_SUCCESS, FETCH_MY_STATS_ERROR
} from '../actions/my-stats';

const initialState = {
  myStats: null,
  loading: false,
  error: null
};

export default function myStatsReducer(state = initialState, action) {
  if (action.type === FETCH_MY_STATS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_MY_STATS_SUCCESS) {
    return Object.assign({}, state, {
      myStats: action.myStats,
      loading: false,
      error: null
    });
  }
  else if (action.type === FETCH_MY_STATS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}