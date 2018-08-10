var port = process.env.PORT || 3000;


const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const {generateMessage, generateLocationMessage} = require("../server/utils/message")




// The reusable paths 
const publicPath = path.join(__dirname, "../public");



//app setup
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


io.on("connection", function (socket) {
    socket.emit("newMessage", generateMessage("Welcome to the chat app", "admin"))
    socket.broadcast.emit("newMessage", generateMessage("A user joined the room !", "admin"))
    socket.on("createMessage", function (email , callback) {
        io.emit("newMessage", generateMessage(email.text, email.from))
        callback();
    })
    //Geolocation Setup 
    socket.on("newLocationMessage" , function(position) {
        io.emit("newLocationMessage" , generateLocationMessage(position.latitude, position.longitude, "admin"))
    })
    socket.on("disconnect", function() {
        socket.broadcast.emit("newMessage", generateMessage("A user has left !" , "user"))
    })
              
});


app.use(express.static(publicPath));

server.listen(port, function () {
    console.log(`Started on port ${port} !`)
})
