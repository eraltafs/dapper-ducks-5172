const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email : String,
    password:String,
    role:{type:"String",enum:["writer","user"],default:"user"}
})
const userModel = mongoose.model("user",userSchema)

module.exports = {userModel}