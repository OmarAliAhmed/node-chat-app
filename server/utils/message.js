var moment = require("moment")
var generateMessage = (text , from) => {
    return {
        text,
        from,
        createdAt : moment().valueOf()
    }
}

var generateLocationMessage = (latitiude , longitude, from) => {
    return {
        from : "user",
        url : `https://www.google.com/maps?q=${latitiude},${longitude}`,
        createdAt : moment().valueOf()
    }
}


module.exports = {
    generateMessage,
    generateLocationMessage
}