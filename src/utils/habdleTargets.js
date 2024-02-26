"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.habdleTargets = void 0;
const habdleTargets = (ships) => {
    return ships.map((ship) => {
        const targets = new Array(ship.length).fill(ship.position);
        return targets.map((target, index) => {
            const { x, y } = target;
            return ship.direction
                ? { x, y: y + index, hit: false, direction: ship.direction }
                : { x: x + index, y, hit: false, direction: ship.direction };
        });
    });
};
exports.habdleTargets = habdleTargets;
