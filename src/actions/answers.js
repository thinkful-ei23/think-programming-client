import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_ANSWERS_REQUEST = 'FETCH_ANSWERS_REQUEST';
export const fetchAnswersRequest = () => ({
  type: FETCH_ANSWERS_REQUEST
});

export const FETCH_ANSWERS_SUCCESS = 'FETCH_ANSWERS_SUCCESS';
export const fetchAnswersSuccess = answer => ({
  type: FETCH_ANSWERS_SUCCESS,
  answer
});

export const FETCH_ANSWERS_ERROR = 'FETCH_ANSWERS_ERROR';
export const fetchAnswersError = error => ({
  type: FETCH_ANSWERS_ERROR,
  error
});

export const fetchAnswers = (questionType, answer, questionNum) => (dispatch, getState) => {
  dispatch(fetchAnswersRequest());
  const authToken = getState().auth.authToken;
  return fetch (`${API_BASE_URL}/gameroom/answers${questionType}/${questionNum}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`},
    body: JSON.stringify({answer})
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(fetchAnswersSuccess(res))})
    .catch(err => {
      dispatch(fetchAnswersError(err));
  });
};