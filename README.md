# Progetto Chat con NodeJs
NodeJs version v18.16.0

## init e dipendenze
```
nvm use v18.16.0

npm init -y
npm install socket.io express http socket.io-client
```

## avvia server
```
node server.js
```

## avvia client
```
node client.js
```

## pubblica servizio senza ip pubblico
```
ssh -R 80:localhost:4200 serveo.net
```