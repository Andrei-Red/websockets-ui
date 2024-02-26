import { wsServer } from './../ws_server'
import { IRoom } from '../types'
import { WS_COMMAND_TYPES } from '../../constants'
import handleWsEvent from './handleWsEvent'

/**
 * Creates a new room with a user and sends updated room information to all clients.
 * @param {IRoom[]} rooms - Array of existing rooms.
 * @param {string} userName - Name of the user creating the room.
 * @param {string} userId - ID of the user creating the room.
 */
const createNewRoomWithUser = (
    rooms: IRoom[],
    userName: string,
    userId: string,
) => {
  // Generate a unique room ID based on timestamp and random number.
  const newRoomId = (Date.now() + Math.random()).toString();

  // Create a new room object with the user.
  const newRoomWithUser: IRoom = {
    roomId: newRoomId,
    roomUsers: [
      {
        name: userName,
        index: userId,
      },
    ],
  };

  // Push the new room to the array of rooms.
  rooms.push(newRoomWithUser);

  // Send updated room information to all clients.
  wsServer.clients.forEach((client) => {
    handleWsEvent(client, WS_COMMAND_TYPES.UPDATE_ROOM, rooms);
  });
};

export default createNewRoomWithUser;
