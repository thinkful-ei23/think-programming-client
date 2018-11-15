import { SEND_JUDGMENT_REQUEST, sendJudgmentRequest, SEND_JUDGMENT_SUCCESS, sendJudgmentSuccess, SEND_JUDGMENT_ERROR, sendJudgmentError } from './judgement';

describe('sendJudgmentRequest', () => {
  it('Should return the action', () => {
    const action = sendJudgmentRequest();
    expect(action.type).toEqual(SEND_JUDGMENT_REQUEST);
  });
});
describe('sendJudgmentSuccess', () => {
  it('Should return the action', () => {
    const action = sendJudgmentSuccess();
    expect(action.type).toEqual(SEND_JUDGMENT_SUCCESS);
  });
});
describe('sendJudgmentError', () => {
  it('Should return the action', () => {
    const error = {}
    const action = sendJudgmentError(error);
    expect(action.type).toEqual(SEND_JUDGMENT_ERROR);
    expect(action.error).toEqual(error);
  });
});