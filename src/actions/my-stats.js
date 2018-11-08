import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_MY_STATS_REQUEST = 'FETCH_MY_STATS_REQUEST';
export const fetchMyStatsRequest = () => ({
  type: FETCH_MY_STATS_REQUEST
});

export const FETCH_MY_STATS_SUCCESS = 'FETCH_MY_STATS_SUCCESS';
export const fetchMyStatsSuccess = myStats => ({
  type: FETCH_MY_STATS_SUCCESS,
  myStats
});

export const FETCH_MY_STATS_ERROR = 'FETCH_MY_STATS_ERROR';
export const fetchMyStatsError = error => ({
  type: FETCH_MY_STATS_ERROR,
  error
});

export const fetchMyStats = () => (dispatch, getState) => {
  dispatch(fetchMyStatsRequest());
  const authToken = getState().auth.authToken;
  return fetch (`${API_BASE_URL}/stats/mystats`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`},
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(fetchMyStatsSuccess(res))})
    .catch(err => {
      dispatch(fetchMyStatsError(err));
  });
};