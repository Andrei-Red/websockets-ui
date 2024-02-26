"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_server_1 = require("./../ws_server");
const constants_1 = require("../../constants");
const handleWsSendEvent_1 = require("./handleWsSendEvent");
const startGame = (gameData, gameId, shooterId, clients) => {
    var _a, _b;
    if (((_a = gameData[gameId]) === null || _a === void 0 ? void 0 : _a.player1) && ((_b = gameData[gameId]) === null || _b === void 0 ? void 0 : _b.player2)) {
        const { player1, player2 } = gameData[gameId];
        shooterId = player1.indexPlayer;
        [...ws_server_1.wsServer.clients].forEach((client) => {
            var _a, _b, _c;
            if (client === ((_a = clients[player1.indexPlayer]) === null || _a === void 0 ? void 0 : _a.ws) ||
                client === ((_b = clients[player2.indexPlayer]) === null || _b === void 0 ? void 0 : _b.ws)) {
                const data = client === ((_c = clients[player1.indexPlayer]) === null || _c === void 0 ? void 0 : _c.ws)
                    ? {
                        ships: player1.ships,
                        currentPlayerIndex: player1.indexPlayer,
                    }
                    : {
                        ships: player2.ships,
                        currentPlayerIndex: player2.indexPlayer,
                    };
                (0, handleWsSendEvent_1.default)(client, constants_1.WS_COMMAND_TYPES.START_GAME, data);
                (0, handleWsSendEvent_1.default)(client, constants_1.WS_COMMAND_TYPES.TURN, {
                    currentPlayer: shooterId,
                });
            }
        });
    }
    return shooterId;
};
exports.default = startGame;
