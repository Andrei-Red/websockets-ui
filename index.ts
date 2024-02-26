import { httpServer } from "./src/http_server/index";
import { WebSocket } from 'ws';
// import {WS_connection} from "./src/websocket_connection/ws_connection";
// import {requestHandlerImpl} from "./src/proxy/requestHandler";
import { handleWsMessageEvent, wsServer } from './src/ws_server';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

const clients = {}

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wsServer.on('connection', (ws: WebSocket) => {
    // Generate a unique code for every user
    const userId = crypto.randomUUID();
    console.log(`Received a new connection.`);

    // Store the new connection
    clients[userId] = { ws, wins: 0, userName: '' };
    console.log(`Client ${userId} connected.`);

    // Handle messages from clients
    handleWsMessageEvent(ws, userId, clients);

    ws.on('error', console.error);

    ws.on('close', () => console.log(`Client ${userId} disconnected`));
});
