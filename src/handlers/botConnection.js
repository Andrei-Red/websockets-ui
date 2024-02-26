"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const botConnection = () => {
    const botWs = new WebSocket(constants_1.WS_ADDRESS);
    botWs.on('open', () => {
        console.log('Bot connected to server');
    });
    botWs.on('close', () => {
        console.log('Disconnected from server');
    });
    return botWs;
};
exports.default = botConnection;
