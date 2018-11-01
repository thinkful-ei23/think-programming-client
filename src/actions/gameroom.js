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

export const fetchQuestions = questionType => dispatch => {
  console.log('fetch attempted');
  dispatch(fetchQuestionsRequest());
  return fetch (`${API_BASE_URL}/gameroom/questions/${questionType}`, {
    method: 'GET',
    headers: {'content-type': 'application/json'}
  })

    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(fetchQuestionsSuccess(res)))
    .catch(err => {
      dispatch(fetchQuestionsError(err));
  });
};


