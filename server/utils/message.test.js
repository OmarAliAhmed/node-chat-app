const expect = require("expect");
const {generateMessage, generateLocationMessage} = require("./message")
describe("generateMessage", () => {
    it("should check the generateMessage function is returning the wanted object", () => {
        var text = "Test case",
            from = "me"

        var generatedMessage = generateMessage(text, from);
        expect(generatedMessage.text).toBe(text);
        expect(generatedMessage.from).toBe(from);
    });
})
describe("generateLocationMessage", () => {
it("should return the proper object", () => {
    var lat = 15,
        lng = 19,
        url = `https://www.google.com/maps?q=15,19`
    var generatedMessage = generateLocationMessage(lat,lng, "admin")
    
    expect(generatedMessage.url).toBe(url)
})
    
})