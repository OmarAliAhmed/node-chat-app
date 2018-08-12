// SETUP
var socket = io();

var generateMessage = (text , from) => {
    return {
        text,
        from,
        createdAt : moment().valueOf()
    }
}


// Disconnection Message handelr
socket.on("disconnect", function (object) {
    socket.emit("createMessage", generateMessage(object.text, "user"))
})
function scrollToBottom() {
    // Selectors
    var messages = jQuery("#messages"),
        newMessage = messages.children("li:last-child")
    //Heights
    var clientHeight = messages.prop("clientHeight"),
        scrollTop = messages.prop("scrollTop"),
        scrollHeight = messages.prop("scrollHeight"),
        newMessageHeight = newMessage.innerHeight(),
        prevMessageHeight = newMessage.prev().innerHeight();
    if( scrollTop + clientHeight + newMessageHeight + prevMessageHeight >= scrollHeight ) {
            messages.scrollTop(scrollHeight)
    }
        
}
//New Message handler 
socket.on("newMessage", function (message) {
      var formattedTime = moment(message.createdAt).format("h:mm a")
      var template = jQuery("#message-template").html()
      var html = Mustache.render(template, {
          text : message.text,
          from : message.from,
          createdAt : formattedTime
      })
      jQuery("#messages").append(html)
      scrollToBottom();
//    var formattedTime = moment(message.createdAt).format("h:mm a")
//    var li = jQuery("<li></li>");
//    li.text(`${message.from} ${formattedTime}: ${message.text}`);
//    jQuery("#messages").append(li);
})

// New location handler
socket.on("newLocationMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#message-location-template").html();
    var html = Mustache.render(template, {
        url : message.url,
        from : message.from,
        createdAt : formattedTime
    })
    jQuery("#messages").append(html)
    scrollToBottom();

})

// Send message button eventlistener 
jQuery("#message-form").on("submit", (e) => {
    e.preventDefault();
    var messageBox = jQuery("[name=message]");
    socket.emit("createMessage", {
        from: "user",
        text: jQuery("[name=message]").val(),
        createdAt: new Date().getTime()
    }, function (hi) {
        messageBox.val("")
    });
})

// Send location event listener
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
