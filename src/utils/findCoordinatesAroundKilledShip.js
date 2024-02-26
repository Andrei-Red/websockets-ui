"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCoordinatesAroundKilledShip = void 0;
const findCoordinatesAroundKilledShip = (ship) => {
    const coordinates = [];
    const { direction } = ship[0];
    if (direction) {
        ship.forEach((target, index) => {
            const { x, y } = target;
            const isFirst = index === 0;
            const isLast = index === ship.length - 1;
            if (isFirst && y > 0) {
                coordinates.push({ x, y: y - 1 }, { x: x - 1, y: y - 1 }, { x: x + 1, y: y - 1 });
            }
            if (isLast && y < 9) {
                coordinates.push({ x, y: y + 1 }, { x: x - 1, y: y + 1 }, { x: x + 1, y: y + 1 });
            }
            coordinates.push({ x: x - 1, y }, { x: x + 1, y });
        });
    }
    else {
        ship.forEach((target, index) => {
            const { x, y } = target;
            const isFirst = index === 0;
            const isLast = index === ship.length - 1;
            if (isFirst && x > 0) {
                coordinates.push({ y, x: x - 1 }, { y: y - 1, x: x - 1 }, { y: y + 1, x: x - 1 });
            }
            if (isLast && x < 9) {
                coordinates.push({ y, x: x + 1 }, { y: y - 1, x: x + 1 }, { y: y + 1, x: x + 1 });
            }
            coordinates.push({ y: y - 1, x }, { y: y + 1, x });
        });
    }
    return coordinates;
};
exports.findCoordinatesAroundKilledShip = findCoordinatesAroundKilledShip;
