var socket = io();


socket.on("newMessage" , function(email) {
    console.log(email)
})
