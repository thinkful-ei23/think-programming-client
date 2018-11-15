import { FETCH_MY_STATS_REQUEST, fetchMyStatsRequest, FETCH_MY_STATS_SUCCESS, fetchMyStatsSuccess, FETCH_MY_STATS_ERROR, fetchMyStatsError } from './my-stats';

describe('fetchMyStatsRequest', () => {
  it('Should return the action', () => {
    const action = fetchMyStatsRequest();
    expect(action.type).toEqual(FETCH_MY_STATS_REQUEST);
  });
});
describe('fetchMyStatsSuccess', () => {
  it('Should return the action', () => {
    const myStats = {}
    const action = fetchMyStatsSuccess(myStats);
    expect(action.type).toEqual(FETCH_MY_STATS_SUCCESS);
    expect(action.myStats).toEqual(myStats);
  });
});
describe('fetchMyStatsError', () => {
  it('Should return the action', () => {
    const error = {}
    const action = fetchMyStatsError(error);
    expect(action.type).toEqual(FETCH_MY_STATS_ERROR);
    expect(action.error).toEqual(error);
  });
});