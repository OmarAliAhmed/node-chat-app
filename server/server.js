var port = process.env.PORT || 3000;


const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http")




// The reusable paths 
const publicPath = path.join(__dirname , "../public");



//app setup
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


io.on("connection", function (socket) {
//socket.emit("newMessage" , {
//    text : "Hey !",
//    from : "Omar Ali",
//    createdAt : new Date().getHours()
//})
socket.on("createMessage", function(email) {
    io.emit("newMessage" , {
        text : email.text,
        from : email.from,
        createdAt : new Date().getHours()
    })
} )
});


app.use(express.static(publicPath));

server.listen(port, function() {
    console.log(`Started on port ${port} !`)
})