export const IN_GAMEROOM = 'IN_GAMEROOM';
export const inGameRoom = (roomType, playerArray) => ({
  type: IN_GAMEROOM,
  roomType,
  playerArray
});
export const ENTER_GAMEROOM = 'ENTER_GAMEROOM';
export const enterGameRoom = roomNumber => ({
  type: ENTER_GAMEROOM,
  roomNumber
});
export const LEAVE_GAMEROOM = 'LEAVE_GAMEROOM';
export const leaveGameroom = roomNumber => ({
  type: LEAVE_GAMEROOM,
  roomNumber
});