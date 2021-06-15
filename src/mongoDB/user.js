const {Schema, model} = require('mongoose');
let userSchema = new Schema({
    User: String,
    Tag: String,
    Daily: Number,
    DailyTime: String,
    Reps: Number,
    RepTime: String,
    CasadoID: String,
    CasadoTime: String,
    LinkBackground: String,
    AboutMe: String
})
module.exports = model("user", userSchema)
