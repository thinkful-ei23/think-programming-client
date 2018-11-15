import { fetchQuestionsRequest, FETCH_QUESTIONS_REQUEST, fetchQuestionsSuccess, FETCH_QUESTIONS_SUCCESS, fetchQuestionsError, FETCH_QUESTIONS_ERROR } from './questions'

describe('fetchQuestionsRequest', () => {
  it('Should return the action', () => {
    const action = fetchQuestionsRequest();
    expect(action.type).toEqual(FETCH_QUESTIONS_REQUEST);
  });
});
describe('fetchQuestionsSuccess', () => {
  it('Should return the action', () => {
    const questions = {}
    const action = fetchQuestionsSuccess(questions);
    expect(action.type).toEqual(FETCH_QUESTIONS_SUCCESS);
    expect(action.questions).toEqual(questions);
  });
});
describe('fetchQuestionsError', () => {
  it('Should return the action', () => {
    const error = {}
    const action = fetchQuestionsError(error);
    expect(action.type).toEqual(FETCH_QUESTIONS_ERROR);
    expect(action.error).toEqual(error);
  });
});