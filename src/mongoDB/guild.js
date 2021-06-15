const {Schema, model} = require('mongoose');

let guildSchema = new Schema({
    Guild: String,
    Name: String,
    Welcome: String,
    GoodBye: String,
    Captcha: String,
    deleteMessageLog: String,
    editMessageLog: String,
    channelCreate: String,
    AutoRole: String,
    prefix: String,
    Vip: String,
    Time: Number
})
module.exports = model("guild", guildSchema)
