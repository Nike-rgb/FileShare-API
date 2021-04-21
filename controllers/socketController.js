const socket = require('socket.io');
require('dotenv').config();

module.exports = function (server) {
    const io = socket(server, {
        cors : {
            origin : process.env.FRONTEND_BASE_URL,
            methods : ["GET", "POST"],
            allowedHeaders : ["content-type"],
        },
    });
    io.on('connection', socket => {
        socket.on('join', uuid => {
            socket.join(uuid);
            console.log("A new user connected");
        });
        socket.on('isReceiverOnline', uuid => {
            socket.to(uuid).emit('isReceiverOnline');
            socket.on('disconnect', () => {
                socket.to(uuid).emit('isOffline');
            });
        });
        socket.on('isSenderOnline', uuid => {
            socket.to(uuid).emit('isSenderOnline');
            socket.on('disconnect', () => {
                socket.to(uuid).emit('isOffline');
            });
        });
        socket.on('newMsg', ({uuid , msg}) => {
            socket.to(uuid).emit('newMsg', msg);
        });
    });
}