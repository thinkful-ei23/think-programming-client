import {
  IN_GAMEROOM,
  ENTER_GAMEROOM,
  LEAVE_GAMEROOM
} from '../actions/game-room';

const initialState = {
  jsQuestions: 0,
  htmlQuestions: 0,
  cssQuestions: 0,
  dsaQuestions: 0
};

export default function gameRoomReducer(state = initialState, action) {
  if (action.type === IN_GAMEROOM) {
    let numOfPlayers = action.playerArray.length;
    let roomType = action.roomType;
    return Object.assign({}, state, {
      [roomType]: numOfPlayers
    });
  };
  if (action.type === ENTER_GAMEROOM) {
    let room = `gameRoom${action.roomNumber}Count`
    return Object.assign({}, state, {
      [room]: state[room] += 1
    });
  };
  if (action.type === LEAVE_GAMEROOM) {
    let room = `gameRoom${action.roomNumber}Count`
    return Object.assign({}, state, {
      [room]: state[room] -= 1
    });
  };
  return state;
}