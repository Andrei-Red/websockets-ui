"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleWsEvent = (ws, commandType, data) => {
    ws.send(JSON.stringify({
        type: commandType,
        data: JSON.stringify(data),
        id: 0,
    }));
};
exports.default = handleWsEvent;
