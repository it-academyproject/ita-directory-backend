const socketio = require('socket.io')
const server = require("../app.js");

//server initialization
const io = socketio(server); 

//Running connection
io.on('connection', (socket) => {
    console.log('Socket ON')
});