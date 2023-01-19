const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
    answer : String,
    question_id:String,
    user_id:String
})
const answerModel = mongoose.model("answer",answerSchema)

module.exports = {answerModel}