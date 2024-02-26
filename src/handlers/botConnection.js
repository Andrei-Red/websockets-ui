"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const constants_1 = require("../../constants");
/**
 * Establishes a WebSocket connection with the server.
 * @returns {WebSocket} The WebSocket connection object.
 */
const botConnection = () => {
    const botWs = new ws_1.WebSocket(constants_1.WS_ADDRESS);
    // Event listener for when the connection is opened.
    botWs.on('open', () => {
        console.log('Bot connected');
    });
    // Event listener for when the connection is closed.
    botWs.on('close', () => {
        console.log('Bot disconnected');
    });
    return botWs;
};
exports.default = botConnection;
