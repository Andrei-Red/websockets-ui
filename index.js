"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./src/http_server/index");
// import {WS_connection} from "./src/websocket_connection/ws_connection";
// import {requestHandlerImpl} from "./src/proxy/requestHandler";
const ws_server_1 = require("./src/ws_server");
const HTTP_PORT = 8181;
const WS_PORT = 3000;
const clients = {};
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_1.httpServer.listen(HTTP_PORT);
ws_server_1.wsServer.on('connection', (ws) => {
    // Generate a unique code for every user
    const userId = crypto.randomUUID();
    console.log(`Received a new connection.`);
    // Store the new connection
    clients[userId] = { ws, wins: 0, userName: '' };
    console.log(`Client ${userId} connected.`);
    // Handle messages from clients
    (0, ws_server_1.handleWsMessageEvent)(ws, userId, clients);
    ws.on('error', console.error);
    ws.on('close', () => console.log(`Client ${userId} disconnected`));
});
