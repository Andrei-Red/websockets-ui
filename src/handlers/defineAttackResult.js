"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defineAttackResult = (players, shooterId, shotCoordinates) => {
    const { x, y } = shotCoordinates;
    const rivalData = Object.values(players).find(({ indexPlayer }) => indexPlayer !== shooterId);
    const rivalShips = rivalData === null || rivalData === void 0 ? void 0 : rivalData.ships;
    let isHit = false;
    let isKilled = false;
    let killedShip = [];
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
    if (!isHit) {
        shooterId = rivalData.indexPlayer;
    }
    return {
        isHit,
        isKilled,
        killedShip,
        rivalData,
        updatedShooterId: shooterId,
    };
};
exports.default = defineAttackResult;
