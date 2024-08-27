const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server });

let gameState = {}; // to hold the game state

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        // Handle game logic here
        console.log(data);
        // Broadcast updated game state to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(gameState)); // send updated game state
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});