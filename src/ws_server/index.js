"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWsMessageEvent = exports.wsServer = void 0;
const ws_1 = require("ws");
const constants_1 = require("../../constants");
const handlers_1 = require("./../handlers");
const sendBotRandomAttack_1 = require("../utils/sendBotRandomAttack");
let rooms = [];
let userName = '';
let gameData = {};
let shooterId = '';
let gameWithBot = false;
let botWebsocket = {};
exports.wsServer = new ws_1.WebSocketServer({ port: 3000 });
const handleWsMessageEvent = (ws, userId, clients) => {
    ws.on('message', (message) => {
        var _a, _b, _c, _d, _e;
        const parsedMessage = JSON.parse(message.toString());
        if ((parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.type) === constants_1.WS_COMMAND_TYPES.REG) {
            const parsedData = JSON.parse((_a = parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.data) === null || _a === void 0 ? void 0 : _a.toString());
            userName = parsedData === null || parsedData === void 0 ? void 0 : parsedData.name;
            clients[userId].userName = userName;
            const data = {
                name: parsedData === null || parsedData === void 0 ? void 0 : parsedData.name,
                index: userId,
                error: false,
                errorText: '',
            };
            (0, handlers_1.handleWsSendEvent)(ws, constants_1.WS_COMMAND_TYPES.REG, data);
            (0, handlers_1.handleWsSendEvent)(ws, constants_1.WS_COMMAND_TYPES.UPDATE_WINNERS, []);
            (0, handlers_1.handleWsSendEvent)(ws, constants_1.WS_COMMAND_TYPES.UPDATE_ROOM, rooms);
        }
        if ((parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.type) === constants_1.WS_COMMAND_TYPES.CREATE_ROOM) {
            const roomWithOneUser = rooms.find((room) => room.roomUsers.length === 1);
            // block possibility create more then 1 room for active session
            if (roomWithOneUser)
                return;
            const userName = (_b = clients[userId]) === null || _b === void 0 ? void 0 : _b.userName;
            (0, handlers_1.createRoomWithUser)(rooms, userName, userId);
        }
        if ((parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.type) === constants_1.WS_COMMAND_TYPES.SINGLE_PLAY) {
            botWebsocket = (0, handlers_1.createBotConnection)();
            const gameId = (Date.now() + Math.random()).toString();
            gameWithBot = true;
            const gameDataResponse = {
                idGame: gameId,
                idPlayer: userId,
            };
            (0, handlers_1.handleWsSendEvent)(ws, constants_1.WS_COMMAND_TYPES.CREATE_GAME, gameDataResponse);
        }
        if ((parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.type) === constants_1.WS_COMMAND_TYPES.ADD_USER_TO_ROOM) {
            const parsedData = JSON.parse((_c = parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.data) === null || _c === void 0 ? void 0 : _c.toString());
            rooms = (0, handlers_1.createGame)(rooms, parsedData, userId, clients);
        }
        if ((parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.type) === constants_1.WS_COMMAND_TYPES.ADD_SHIPS) {
            const parsedData = JSON.parse((_d = parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.data) === null || _d === void 0 ? void 0 : _d.toString());
            (0, handlers_1.defineGameData)(parsedData, gameData, gameWithBot);
            shooterId = (0, handlers_1.startGame)(gameData, parsedData.gameId, shooterId, clients);
        }
        if ((parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.type) === constants_1.WS_COMMAND_TYPES.ATTACK ||
            (parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.type) === constants_1.WS_COMMAND_TYPES.RANDOM_ATTACK) {
            const parsedData = JSON.parse((_e = parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.data) === null || _e === void 0 ? void 0 : _e.toString());
            // ignore out of turn attacks
            if (shooterId !== parsedData.indexPlayer)
                return;
            const { updatedGameData, updatedShooterId } = (0, handlers_1.handleAttack)(clients, gameData, parsedMessage, shooterId, rooms);
            const isGameFinished = !Object.keys(updatedGameData[parsedData === null || parsedData === void 0 ? void 0 : parsedData.gameId]).length;
            if (isGameFinished && botWebsocket.readyState === ws_1.WebSocket.OPEN) {
                botWebsocket.close();
            }
            (0, sendBotRandomAttack_1.default)(updatedShooterId, parsedData === null || parsedData === void 0 ? void 0 : parsedData.gameId, isGameFinished, botWebsocket);
            gameData = updatedGameData;
            shooterId = updatedShooterId;
        }
    });
};
exports.handleWsMessageEvent = handleWsMessageEvent;
