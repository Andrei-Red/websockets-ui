"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("./../handlers");
const constants_1 = require("../../constants");
const botRandomAttack = (shooterId, gameId, isGameFinished, botWebsocket) => {
    if (shooterId === constants_1.BOT_ID && !isGameFinished) {
        const data = {
            gameId,
            indexPlayer: shooterId,
        };
        setTimeout(() => (0, handlers_1.handleWsSendEvent)(botWebsocket, constants_1.WS_COMMAND_TYPES.RANDOM_ATTACK, data), 2000);
    }
};
exports.default = botRandomAttack;
