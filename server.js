const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

PORT = 4200
let nextId = 1;
let users = [];

// ssh -R 80:localhost:4200 serveo.net

io.on('connection', (socket) => {
    console.log('Un nuovo utente si è connesso');

    // socket in ascolto sul server (id => "userConnection")
    socket.on('userConnection', (param, callback) => {
        const newUser = "Utente " + nextId;
        console.log('Registrato nuovo utente: ' + newUser);
        users.push(newUser);
        nextId++;
        // ho generato una user univoca ed ora la comunico
        // al client così può partecipare alla chat
        callback(newUser);
    });

    // socket in ascolto sul server (id => "userDisconnect")
    socket.on('userDisconnect', (param) => {
        console.log('L\' utente \'' + param + '\' si è disconnesso.');
    });

    // socket in ascolto sul server (id => "sendToServer")
    socket.on('sendToServer', (msg) => {
        // faccio echo a tutti i client connessi del messaggio
        // che mi è arrivato da uno dei client
        io.emit('sendToClient', msg);
    });
});

server.listen(PORT, () => {
    console.log('Il server è in ascolto sulla porta ' + PORT);
});