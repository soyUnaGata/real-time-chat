import { Server } from 'socket.io';

const users = {};
const port = process.env.PORT || 5000; 

const io = new Server(port, {
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
        socket.emit('chat-message', { message: message, username: users[socket.id] }) 
        socket.broadcast.emit('chat-message', { message: message, username: users[socket.id] }) 
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    });
});