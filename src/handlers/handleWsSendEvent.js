"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleWsSendEvent = (ws, commandType, data) => {
    ws.send(JSON.stringify({
        type: commandType,
        data: JSON.stringify(data),
        id: 0,
    }));
};
exports.default = handleWsSendEvent;
