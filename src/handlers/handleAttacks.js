"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const handlerCoordinates_1 = require("../utils/handlerCoordinates");
const defineResultAttack_1 = require("./defineResultAttack");
const findCoordinatesKilledShip_1 = require("../utils/findCoordinatesKilledShip");
const handleWsEvent_1 = require("./handleWsEvent");
const handleAttacks = (clients, gameData, parsedMessage, shooterId, rooms) => {
    var _a;
    const parsedData = JSON.parse((_a = parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.data) === null || _a === void 0 ? void 0 : _a.toString());
    const { gameId, indexPlayer: shooterIndex } = parsedData;
    const shotCoordinates = (0, handlerCoordinates_1.default)(parsedMessage);
    const { isHit, isKilled, killedShip, rivalData, updatedShooterId } = (0, defineResultAttack_1.default)(gameData[gameId], shooterId, shotCoordinates);
    shooterId = updatedShooterId;
    const { player1, player2 } = gameData[gameId];
    const { x, y } = shotCoordinates;
    Object.entries(clients)
        .filter(([clientId]) => clientId === player1.indexPlayer || clientId === player2.indexPlayer)
        .forEach(([clientId, client]) => {
        const attackResultData = {
            position: { x, y },
            currentPlayer: shooterIndex,
            status: isKilled
                ? constants_1.ATTACK_STATUSES.KILLED
                : isHit
                    ? constants_1.ATTACK_STATUSES.SHOT
                    : constants_1.ATTACK_STATUSES.MISS,
        };
        (0, handleWsEvent_1.default)(client.ws, constants_1.WS_COMMAND_TYPES.ATTACK, attackResultData);
        if (isKilled) {
            killedShip.forEach((targets) => {
                if (!(targets.x === x && targets.y === y)) {
                    const killedAttackResultData = {
                        position: { x: targets.x, y: targets.y },
                        currentPlayer: shooterIndex,
                        status: constants_1.ATTACK_STATUSES.KILLED,
                    };
                    (0, handleWsEvent_1.default)(client.ws, constants_1.WS_COMMAND_TYPES.ATTACK, killedAttackResultData);
                }
            });
            const coordinatesAroundKilledShip = (0, findCoordinatesKilledShip_1.findCoordinatesKilledShip)(killedShip);
            coordinatesAroundKilledShip.forEach((coordinate) => {
                const missedAttackResultData = {
                    position: { x: coordinate.x, y: coordinate.y },
                    currentPlayer: shooterIndex,
                    status: constants_1.ATTACK_STATUSES.MISS,
                };
                (0, handleWsEvent_1.default)(client.ws, constants_1.WS_COMMAND_TYPES.ATTACK, missedAttackResultData);
            });
        }
        const allShipsKilled = rivalData.ships.every((targets) => targets.every((target) => target.hit));
        if (isKilled && allShipsKilled) {
            if (clientId === shooterId) {
                client.wins += 1;
            }
            gameData[gameId] = {};
            const finishGameData = {
                winPlayer: shooterId,
            };
            const winnerData = {
                name: client.userName,
                wins: client.wins,
            };
            (0, handleWsEvent_1.default)(client.ws, constants_1.WS_COMMAND_TYPES.FINISH, finishGameData);
            (0, handleWsEvent_1.default)(client.ws, constants_1.WS_COMMAND_TYPES.UPDATE_WINNERS, winnerData);
            (0, handleWsEvent_1.default)(client.ws, constants_1.WS_COMMAND_TYPES.UPDATE_ROOM, rooms);
        }
        else {
            const turnData = {
                currentPlayer: shooterId,
            };
            (0, handleWsEvent_1.default)(client.ws, constants_1.WS_COMMAND_TYPES.TURN, turnData);
        }
    });
    return { updatedGameData: gameData, updatedShooterId: shooterId };
};
exports.default = handleAttacks;
