import {
  ENTER_GAMEROOM,
  LEAVE_GAMEROOM
} from '../actions/game-room';

const initialState = {
  gameRoom0Count: 0,
  gameRoom1Count: 0,
  gameRoom2Count: 0,
  gameRoom3Count: 0,
  loading: false,
  error: null
};

export default function gameRoomReducer(state = initialState, action) {
  if (action.type === ENTER_GAMEROOM) {
    let room = `gameRoom${action.roomNumber}Count`
    return Object.assign({}, state, {
      room: 
    });
  }
  else if (action.type === LEAVE_GAMEROOM) {
    return Object.assign({}, state, {
      questions: action.questions,
      loading: false,
      error: null
    });
  }
  else if (action.type === FETCH_QUESTIONS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}