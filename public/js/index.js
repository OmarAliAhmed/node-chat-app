var socket = io();


socket.on("disconnect", function (object) {
    socket.emit("createMessage", generateMessage(object.text, "user"))
})


socket.on("newMessage", function (message) {
    var li = jQuery("<li></li>");
    li.text(`${message.from} : ${message.text}`);
    jQuery("#messages").append(li);
})
socket.on("newLocationMessage", function (message) {
    var li = jQuery(`<li>${message.from} : </li>`);
    var a = jQuery("<a>My current location</a>")
    a.attr("href", message.url)
    li.append(a);
    jQuery("#messages").append(li)
})
jQuery("#message-form").on("submit", (e) => {
    e.preventDefault();
    var messageBox = jQuery("[name=message]");
    socket.emit("createMessage", {
        from: "user",
        text: jQuery("[name=message]").val(),
        createdAt: new Date().getTime()
    }, function () {
        messageBox.val("")
    });
})

var locationButton = jQuery("#send-location");
locationButton.on("click", function () {
    if (!navigator.geolocation) {
        alert("Unfortuntly, your browser doesn't support Geolocation !")
    } else {
        locationButton.attr("disabled", "disabled").text("sending location....")
        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr("disabled").text("Send location")
            socket.emit("newLocationMessage", {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            })
        }, function (err) {
            alert("Unable to fetch your location")
            locationButton.attr("disabled", "disabled")
        })
    }

})
