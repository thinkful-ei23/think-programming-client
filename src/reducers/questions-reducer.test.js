/* global $ expect jest */
import questionsReducer from './questions';
import {
  fetchQuestionsRequest,
  FETCH_QUESTIONS_REQUEST,
  fetchQuestionsSuccess,
  FETCH_QUESTIONS_SUCCESS,
  fetchQuestionsError,
  FETCH_QUESTIONS_ERROR
} from '../actions/questions';

describe('Questions Reducers', () => {
  it('Should set the initial state when nothing is passed in.', () => {
    const state = questionsReducer(undefined, { type: '@@UNKNOWN' });
    expect(state).toEqual({
      questions: {},
      loading: false,

      error: null
    });
  });
  it('Should handle the fetch questions success action.', () => {
    const oldState = {
      questions: {},

      loading: false,

      error: null
    };
    const question = { test: 'test' };
    const state = questionsReducer(oldState, fetchQuestionsSuccess(question));
    expect(state.questions).toEqual(question);
  });
  it('Should handle the fetch playlist error action.', () => {
    const oldState = {
      questions: {},

      loading: false,

      error: null
    };
    const error = { error: 400 };
    const state = questionsReducer(oldState, fetchQuestionsError(error));
    expect(state.error).toEqual(error);
  });
});
