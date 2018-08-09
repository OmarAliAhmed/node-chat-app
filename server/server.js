var port = process.env.PORT || 3000;


const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const {generateMessage} = require("../server/utils/message")




// The reusable paths 
const publicPath = path.join(__dirname, "../public");



//app setup
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


io.on("connection", function (socket) {
    socket.emit("newMessage", generateMessage("Welcome to the chat app", "admin"))
    socket.broadcast.emit("newMessage", generateMessage("A user joined the room !", "admin"))
    socket.on("createMessage", function (email) {
        socket.broadcast.emit("newMessage", generateMessage(email.text, email.from))
    })
});


app.use(express.static(publicPath));

server.listen(port, function () {
    console.log(`Started on port ${port} !`)
})
