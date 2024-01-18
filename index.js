// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');
    socket.on('nickname', (nickname) => {
        console.log('El nickname del usuario es ' + nickname);
        socket.nickname = nickname;
        socket.broadcast.emit('message', nickname + ' ha entrado al lobby');
    });
    socket.on('cursor', (data) => {
        console.log('El cursor del usuario ' + socket.nickname + ' está en ' + data.x + ', ' + data.y);
        socket.broadcast.emit('cursor', {nickname: socket.nickname, x: data.x, y: data.y});
    });
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
        socket.broadcast.emit('message', socket.nickname + ' ha salido del lobby');
    });
});

http.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
