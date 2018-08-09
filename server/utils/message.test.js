const expect = require("expect");
const {generateMessage} = require("./message")
describe("generateMessage", () => {
    it("should check the generateMessage function is returning the wanted object", () => {
        var text = "Test case",
            from = "me"

        var generatedMessage = generateMessage(text, from);
        expect(generatedMessage.text).toBe(text);
        expect(generatedMessage.from).toBe(from);
    });
})
