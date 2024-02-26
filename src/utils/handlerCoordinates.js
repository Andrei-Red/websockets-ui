"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const handlerCoordinates = (parsedMessage) => {
    var _a;
    const parsedData = JSON.parse((_a = parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.data) === null || _a === void 0 ? void 0 : _a.toString());
    const x = (parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.type) === constants_1.WS_COMMAND_TYPES.RANDOM_ATTACK
        ? Math.floor(Math.random() * 10)
        : parsedData.x;
    const y = (parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.type) === constants_1.WS_COMMAND_TYPES.RANDOM_ATTACK
        ? Math.floor(Math.random() * 10)
        : parsedData.y;
    return { x, y };
};
exports.default = handlerCoordinates;
