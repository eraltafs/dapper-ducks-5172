const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    question : String,
    tag:String,
    user_id:String
})
const questionModel = mongoose.model("question",questionSchema)

module.exports = {questionModel}