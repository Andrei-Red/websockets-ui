"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_server_1 = require("./../ws_server");
const constants_1 = require("../../constants");
const handleWsSendEvent_1 = require("./handleWsSendEvent");
const createGame = (rooms, data, userId, clients) => {
    var _a;
    const roomWithOneUser = rooms.find((room) => {
        var _a;
        return room.roomId === (data === null || data === void 0 ? void 0 : data.indexRoom) &&
            room.roomUsers.length &&
            ((_a = room.roomUsers[0]) === null || _a === void 0 ? void 0 : _a.index) !== userId;
    });
    if (roomWithOneUser) {
        rooms = rooms.filter((room) => room.roomId !== (data === null || data === void 0 ? void 0 : data.indexRoom) && room.roomUsers.length);
        const rivalId = (_a = roomWithOneUser.roomUsers[0]) === null || _a === void 0 ? void 0 : _a.index;
        const gameId = (Date.now() + Math.random()).toString();
        const wsServerClients = [...ws_server_1.wsServer.clients];
        wsServerClients.forEach((client) => {
            var _a, _b, _c;
            if (client === ((_a = clients[userId]) === null || _a === void 0 ? void 0 : _a.ws) || client === ((_b = clients[rivalId]) === null || _b === void 0 ? void 0 : _b.ws)) {
                const gameDataResponse = {
                    idGame: gameId,
                    idPlayer: client === ((_c = clients[userId]) === null || _c === void 0 ? void 0 : _c.ws) ? userId : rivalId,
                };
                (0, handleWsSendEvent_1.default)(client, constants_1.WS_COMMAND_TYPES.CREATE_GAME, gameDataResponse);
                (0, handleWsSendEvent_1.default)(client, constants_1.WS_COMMAND_TYPES.UPDATE_ROOM, rooms);
            }
        });
    }
    return rooms;
};
exports.default = createGame;
