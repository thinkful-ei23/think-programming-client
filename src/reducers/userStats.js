import {
  CREATE_USERSTATS_REQUEST,
  CREATE_USERSTATS_ERROR
} from '../actions/userStats';

const initialState = {
  loading: false,
  error: null
};

export default function userStatsReducer(state = initialState, action) {
  if (action.type === CREATE_USERSTATS_REQUEST) {
      return Object.assign({}, state, {
          loading: true,
          error: null
      });
  } else if (action.type === CREATE_USERSTATS_ERROR) {
      return Object.assign({}, state, {
          loading: false,
          error: action.error
      });
  };
  return state;
};