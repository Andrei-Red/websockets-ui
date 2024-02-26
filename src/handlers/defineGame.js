"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const habdleTargets_1 = require("../utils/habdleTargets");
const constants_1 = require("../../constants");
const defineGame = (parsedData, gameData, gameWithBot) => {
    const { gameId, ships, indexPlayer } = parsedData;
    const targets = (0, habdleTargets_1.habdleTargets)(ships);
    if (!gameData[gameId]) {
        gameData[gameId] = { player1: { ships: targets, indexPlayer } };
        if (gameWithBot) {
            const botShips = constants_1.BOT_SHIPS_PLACEMENT_VARIANTS[Math.floor(Math.random() * 5)];
            gameData[gameId].player2 = { ships: botShips, indexPlayer: constants_1.BOT_ID };
        }
    }
    else {
        gameData[gameId].player2 = { ships: targets, indexPlayer };
    }
};
exports.default = defineGame;
