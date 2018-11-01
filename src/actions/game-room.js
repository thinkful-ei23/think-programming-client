export const ENTER_GAMEROOM = 'ENTER_GAMEROOM';
export const enterGameroom = roomNumber => ({
  type: ENTER_GAMEROOM,
  roomNumber
});
export const LEAVE_GAMEROOM = 'LEAVE_GAMEROOM';
export const leaveGameroom = roomNumber => ({
  type: LEAVE_GAMEROOM,
  roomNumber
});