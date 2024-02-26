"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines the result of an attack and updates player and game state accordingly.
 * @param {IPlayers} players - Object containing information about all players.
 * @param {string} shooterId - ID of the player initiating the attack.
 * @param {{x: number, y: number}} shotCoordinates - Coordinates of the attack.
 * @returns {Object} Object containing information about the attack result.
 */
const defineResultAttack = (players, shooterId, shotCoordinates) => {
    const { x, y } = shotCoordinates;
    // Find the rival player based on the shooter's ID.
    const rivalData = Object.values(players).find((player) => player.indexPlayer !== shooterId);
    // Extract the rival player's ships.
    const rivalShips = rivalData === null || rivalData === void 0 ? void 0 : rivalData.ships;
    // Initialize variables to track attack result.
    let isHit = false;
    let isKilled = false;
    let killedShip = [];
    // Update rival player's ships based on the attack.
    rivalData.ships = rivalShips.map((targets) => {
        const checkedTargets = targets.map((target) => {
            if (target.x === x && target.y === y) {
                isHit = true;
                return Object.assign(Object.assign({}, target), { hit: true });
            }
            else {
                return target;
            }
        });
        const isShipKilled = checkedTargets.every((target) => target.hit) &&
            Boolean(checkedTargets.find((target) => target.x === x && target.y === y));
        if (isShipKilled) {
            isKilled = true;
            killedShip = checkedTargets;
        }
        return checkedTargets;
    });
    // Update shooter ID if the attack missed.
    if (!isHit) {
        shooterId = rivalData.indexPlayer;
    }
    // Return the attack result.
    return {
        isHit,
        isKilled,
        killedShip,
        rivalData,
        updatedShooterId: shooterId,
    };
};
exports.default = defineResultAttack;
