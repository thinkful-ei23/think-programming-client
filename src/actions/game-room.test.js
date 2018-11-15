import { IN_GAMEROOM, inGameRoom, ENTER_GAMEROOM, enterGameRoom, LEAVE_GAMEROOM, leaveGameroom } from './game-room';

describe('inGameRoom', () => {
    it('Should return the action', () => {
        const roomType = 'jsQuestions';
        const playerArray = [];
        const action = inGameRoom(roomType, playerArray);
        expect(action.type).toEqual(IN_GAMEROOM);
    });
});
describe('enterGameRoom', () => {
  it('Should return the action', () => {
    const roomNumber = 0;
    const action = enterGameRoom(roomNumber);
    expect(action.type).toEqual(ENTER_GAMEROOM);
    expect(action.roomNumber).toEqual(roomNumber);
  });
});
describe('leaveGameRoom', () => {
  it('Should return the action', () => {
    const roomNumber = 0;
    const action = leaveGameroom(roomNumber);
    expect(action.type).toEqual(LEAVE_GAMEROOM);
    expect(action.roomNumber).toEqual(roomNumber);
  });
});