import { Server } from 'socket.io';

const users = {};

const io = new Server(5000, {
    cors: {
      origin: '*',
    }
});

io.on('connection', (socket) => {
    socket.on('new-user', username => {
        users[socket.id] = username;
        socket.emit('user-connected', username);
        socket.broadcast.emit('user-connected', username);
    });

    socket.on('send-chat-message', (message) => {
        socket.emit('chat-message', { message: message, username: users[socket.id] }) // i will see msg i send
        socket.broadcast.emit('chat-message', { message: message, username: users[socket.id] }) // other people in chat will see msg
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    });
});