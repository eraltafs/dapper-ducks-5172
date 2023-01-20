const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const cors = require("cors")
const cookieParser = require("cookie-parser")

const fs = require("fs")

const {connection} = require("./config/db")
const {userModel} = require("./models/User.model")
const {authentication} =require("./middleware/authentication")
const {authorise} =require("./middleware/authorisation")


const app = express();
app.use(express.json())
app.use(cors({
    origin : "*"
}))

app.get("/", (req, res) => {
    res.send("Welcome To API")
})

app.post("/signup",async function(req,res){
    const {email, password}=req.body
    const user = await userModel.findOne({email})
    if(user?.email){
        res.send({msg:"user exists"})
    }else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                // Store hash in your password DB.
                if(hash){
                    const user = new userModel({email,password:hash})
                    await user.save()
                    res.send({msg:"user added"})
                }
            });
        }catch(err){
            console.log(err)
        }
    }
})
app.post("/login",async function(req,res){
    const {email, password}=req.body
    const user = await userModel.findOne({email})
    if(user?.email){
        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(result){
                const token = jwt.sign(
                    { user_id: user._id, role:user.role }, 
                    process.env.seckey,
                    {expiresIn:"1d"}
                )
                const refresToken = jwt.sign(
                    {id:user._id},
                    process.env.refkey,
                    {expiresIn:"7d"}
                )
                res.cookie("token", token, {httpOnly : true})
                res.send({msg:"logged in",token,refresToken})
            }else{
                res.send({msg:"login again"})
            }
        });
    }else{
        res.send("login again")
    }
})
app.get("/logout", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    const blacklistdata = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"))
    blacklistdata.push(token)
    fs.writeFileSync("./blacklist.json", JSON.stringify(blacklistdata))
    return res.send("User logged out successfully")
})

app.listen(8080, async () => {
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log("Listening on PORT 8080")
})

