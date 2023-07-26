const io = require('socket.io-client');

PORT = 4200;
//const socket = io.connect('http://localhost:' + PORT);

// ssh -R 80:localhost:4200 serveo.net
const socket = io.connect('https://adustum.serveo.net');

let user = '';

process.stdin.on('data', function (data) {
    // Evento in loop che attende un INVIO per inviare
    // un messaggio al server e alla chat di gruppo
    // tramite la connessione Socket.IO (id evento
    // "sendToServer")
    socket.emit('sendToServer', [user, data.toString().trim()]);
});

process.on('exit', (code) => {
    // Puoi eseguire operazioni o pulizie qui prima
    // della chiusura del programma
    socket.emit('userDisconnect', user);
});

process.on('SIGINT', () => {
    console.log('Chiusura forzata del programma con CTRL+C');
    // Termina il programma in modo corretto e chiude il processo
    process.exit(0);
    // ora parte la chiamata "process.on('exit', ...)" che
    // invia la disconnessione al server
});

socket.on('sendToClient', function (msg) {
    //console.log("Server: " + msg);
    if (user != msg[0]) {
        console.log("[" + msg[0] + "] " + msg[1]);
    }
});

function onConnect() {
    console.log('Connesso al server.');
    console.log('Per chiudere il programma CTRL+C');
    console.log('Digita i messaggi e dai INVIO.');
    console.log("");

    socket.emit('userConnection', '', (response) => {
        console.log('Il server ti ha assegnato l\'utenza \'' + response + '\'');
        user = response;
    });
}

// Registra il client sul server
socket.on('connect', onConnect);