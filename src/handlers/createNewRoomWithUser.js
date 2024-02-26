"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_server_1 = require("./../ws_server");
const constants_1 = require("../../constants");
const handleWsEvent_1 = require("./handleWsEvent");
/**
 * Creates a new room with a user and sends updated room information to all clients.
 * @param {IRoom[]} rooms - Array of existing rooms.
 * @param {string} userName - Name of the user creating the room.
 * @param {string} userId - ID of the user creating the room.
 */
const createNewRoomWithUser = (rooms, userName, userId) => {
    // Generate a unique room ID based on timestamp and random number.
    const newRoomId = (Date.now() + Math.random()).toString();
    // Create a new room object with the user.
    const newRoomWithUser = {
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
    ws_server_1.wsServer.clients.forEach((client) => {
        (0, handleWsEvent_1.default)(client, constants_1.WS_COMMAND_TYPES.UPDATE_ROOM, rooms);
    });
};
exports.default = createNewRoomWithUser;
