
const server = require('http').createServer(require('./app'));
const io = require('socket.io')(server);
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ name, room }, callback) => {
        // add user
        const { user } = userJoin(socket.id, name, room);
        // let user join the room
        socket.join(user.room);
        // Welcome current user
        socket.emit('message', { user: 'ADMIN', text: `${user.name}, Welcome to the room ${user.room}`});
    
        // Broadcast(everyone see) when a user connects
        socket.broadcast.to(user.room).emit('message', { user: 'ADMIN', text: `${user.name}, has joined ${user.room}`});

        // Send users and room info
        io.to(user.room).emit('roomusers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    })

    // Listen for chat message
    socket.on('sendMessage', (message, callback) => {
        // get the user
        const user = getCurrentUser(socket.id);
        // send the message to specific room
        io.to(user.room).emit('message',  { user: user.name, text: message });
        io.to(user.room).emit('roomusers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
        callback();
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text:`${user.name} left the chat`});

            // Send users and room info
            io.to(user.room).emit('roomusers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`server connected running on port ${PORT}`);
});