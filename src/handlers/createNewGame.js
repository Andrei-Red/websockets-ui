"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_server_1 = require("./../ws_server");
const constants_1 = require("../../constants");
const handleWsEvent_1 = require("./handleWsEvent");
/**
 * Creates a new game and sends relevant data to the players involved.
 * @param {IRoom[]} rooms - Array of existing rooms.
 * @param {any} data - Data containing information about the new game.
 * @param {string} userId - ID of the user initiating the game.
 * @param {IClients} clients - Object containing WebSocket clients.
 * @returns {IRoom[]} Updated array of rooms.
 */
const createNewGame = (rooms, data, userId, clients) => {
    var _a;
    const roomWithOneUser = rooms.find((room) => {
        var _a;
        return room.roomId === (data === null || data === void 0 ? void 0 : data.indexRoom) &&
            room.roomUsers.length &&
            ((_a = room.roomUsers[0]) === null || _a === void 0 ? void 0 : _a.index) !== userId;
    });
    if (roomWithOneUser) {
        // Filter out the room being used for the new game.
        rooms = rooms.filter((room) => room.roomId !== (data === null || data === void 0 ? void 0 : data.indexRoom) && room.roomUsers.length);
        const rivalId = (_a = roomWithOneUser.roomUsers[0]) === null || _a === void 0 ? void 0 : _a.index;
        const gameId = (Date.now() + Math.random()).toString();
        // Loop through WebSocket clients to send game data and update room information.
        ws_server_1.wsServer.clients.forEach((client) => {
            var _a, _b, _c;
            // Determine if the client is one of the players involved.
            if (client === ((_a = clients[userId]) === null || _a === void 0 ? void 0 : _a.ws) || client === ((_b = clients[rivalId]) === null || _b === void 0 ? void 0 : _b.ws)) {
                const gameDataResponse = {
                    idGame: gameId,
                    idPlayer: client === ((_c = clients[userId]) === null || _c === void 0 ? void 0 : _c.ws) ? userId : rivalId,
                };
                // Send game data to the player.
                (0, handleWsEvent_1.default)(client, constants_1.WS_COMMAND_TYPES.CREATE_GAME, gameDataResponse);
                // Send updated room information to the player.
                (0, handleWsEvent_1.default)(client, constants_1.WS_COMMAND_TYPES.UPDATE_ROOM, rooms);
            }
        });
    }
    return rooms;
};
exports.default = createNewGame;
