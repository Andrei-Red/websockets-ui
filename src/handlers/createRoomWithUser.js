"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_server_1 = require("./../ws_server");
const constants_1 = require("../../constants");
const handleWsSendEvent_1 = require("./handleWsSendEvent");
const createRoomWithUser = (rooms, userName, userId) => {
    const newRoomWithUser = {
        roomId: (Date.now() + Math.random()).toString(),
        roomUsers: [
            {
                name: userName,
                index: userId,
            },
        ],
    };
    rooms.push(newRoomWithUser);
    [...ws_server_1.wsServer.clients].forEach((client) => {
        (0, handleWsSendEvent_1.default)(client, constants_1.WS_COMMAND_TYPES.UPDATE_ROOM, rooms);
    });
};
exports.default = createRoomWithUser;
