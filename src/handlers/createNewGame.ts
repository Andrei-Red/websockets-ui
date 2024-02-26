import { wsServer } from './../ws_server'
import { IClients, IRoom } from '../types'
import { WS_COMMAND_TYPES } from '../../constants'
import handleWsEvent from './handleWsEvent'

/**
 * Creates a new game and sends relevant data to the players involved.
 * @param {IRoom[]} rooms - Array of existing rooms.
 * @param {any} data - Data containing information about the new game.
 * @param {string} userId - ID of the user initiating the game.
 * @param {IClients} clients - Object containing WebSocket clients.
 * @returns {IRoom[]} Updated array of rooms.
 */
const createNewGame = (
    rooms: any,
    data: any,
    userId: string,
    clients: IClients,
): IRoom[] => {
  const roomWithOneUser = rooms.find(
      (room) =>
          room.roomId === data?.indexRoom &&
          room.roomUsers.length &&
          room.roomUsers[0]?.index !== userId,
  )

  if (roomWithOneUser) {
    // Filter out the room being used for the new game.
    rooms = rooms.filter(
        (room) => room.roomId !== data?.indexRoom && room.roomUsers.length,
    )

    const rivalId = roomWithOneUser.roomUsers[0]?.index as string
    const gameId = (Date.now() + Math.random()).toString()

    // Loop through WebSocket clients to send game data and update room information.
    wsServer.clients.forEach((client) => {
      // Determine if the client is one of the players involved.
      if (client === clients[userId]?.ws || client === clients[rivalId]?.ws) {
        const gameDataResponse = {
          idGame: gameId,
          idPlayer: client === clients[userId]?.ws ? userId : rivalId,
        }

        // Send game data to the player.
        handleWsEvent(
            client,
            WS_COMMAND_TYPES.CREATE_GAME,
            gameDataResponse,
        )

        // Send updated room information to the player.
        handleWsEvent(client, WS_COMMAND_TYPES.UPDATE_ROOM, rooms)
      }
    })
  }

  return rooms
}

export default createNewGame
