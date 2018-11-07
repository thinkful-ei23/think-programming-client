import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const fetchQuestionsRequest = () => ({
  type: FETCH_QUESTIONS_REQUEST
});

export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const fetchQuestionsSuccess = questions => ({
  type: FETCH_QUESTIONS_SUCCESS,
  questions
});

export const FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';
export const fetchQuestionsError = error => ({
  type: FETCH_QUESTIONS_ERROR,
  error
});

export const fetchQuestions = (questionType, num) => (dispatch, getState) => {
  dispatch(fetchQuestionsRequest());
  const authToken = getState().auth.authToken;
  return fetch (`${API_BASE_URL}/gameroom/questions?question=${questionType}&num=${num}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(fetchQuestionsSuccess(res)))
    .catch(err => {
      dispatch(fetchQuestionsError(err));
  });
};


