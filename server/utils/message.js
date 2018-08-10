var generateMessage = (text , from) => {
    return {
        text,
        from,
        createdAt : new Date().getTime()
    }
}

var generateLocationMessage = (latitiude , longitude, from) => {
    return {
        from : "user",
        url : `https://www.google.com/maps?q=${latitiude},${longitude}`,
        createdAt : new Date().getTime()
    }
}


module.exports = {
    generateMessage,
    generateLocationMessage
}