import {
  ENTER_GAMEROOM,
  LEAVE_GAMEROOM
} from '../actions/game-room';

const initialState = {
  gameRoom0Count: 0,
  gameRoom1Count: 0,
  gameRoom2Count: 0,
  gameRoom3Count: 0
};

export default function gameRoomReducer(state = initialState, action) {
  if (action.type === ENTER_GAMEROOM) {
    console.log('attempted')
    let room = `gameRoom${action.roomNumber}Count`
    return Object.assign({}, state, {
      [room]: state[room] += 1
    });
  }
  else if (action.type === LEAVE_GAMEROOM) {
    let room = `gameRoom${action.roomNumber}Count`
    return Object.assign({}, state, {
      [room]: state[room] -= 1
    });
  }
  return state;
}