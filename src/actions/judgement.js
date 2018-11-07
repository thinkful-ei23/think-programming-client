import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const SEND_JUDGMENT_REQUEST = 'SEND_JUDGMENT_REQUEST';
export const sendJudgmentRequest = () => ({
  type: SEND_JUDGMENT_REQUEST
});

export const SEND_JUDGMENT_SUCCESS = 'SEND_JUDGMENT_SUCCESS';
export const sendJudgmentSuccess = () => ({
  type: SEND_JUDGMENT_SUCCESS
});

export const SEND_JUDGMENT_ERROR = 'SEND_JUDGMENT_ERROR';
export const sendJudgmentError = error => ({
  type: SEND_JUDGMENT_ERROR,
  error
});

export const sendJudgment = (questionType, answer) => (dispatch, getState) => {
  dispatch(sendJudgmentRequest());
  const authToken = getState().auth.authToken;
  return fetch (`${API_BASE_URL}/gameroom/judgment/${questionType}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`},
    body: JSON.stringify({answer})
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(sendJudgmentSuccess(res))})
    .catch(err => {
      dispatch(sendJudgmentError(err));
  });
};