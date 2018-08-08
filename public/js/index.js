var socket = io();


socket.on("newMessage" , function(email) {
    console.log(email)
})
socket.emit("createMessage" , {
    text : "FUCK YOU",
    from : "Pualine Mitard",
    createdAt : new Date().getHours()
})