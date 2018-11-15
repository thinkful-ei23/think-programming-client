import { createUserStatsRequest, CREATE_USERSTATS_REQUEST, createUserStatsError, CREATE_USERSTATS_ERROR } from './userStats'

describe('createUserStatsRequest', () => {
  it('Should return the action', () => {
    const action = createUserStatsRequest();
    expect(action.type).toEqual(CREATE_USERSTATS_REQUEST);
  });
});
describe('createUserStatsError', () => {
  it('Should return the action', () => {
    const error = {}
    const action = createUserStatsError(error);
    expect(action.type).toEqual(CREATE_USERSTATS_ERROR);
    expect(action.error).toEqual(error);
  });
});