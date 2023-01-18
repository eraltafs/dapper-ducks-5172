const jwt = require("jsonwebtoken")
require("dotenv").config()
const fs = require("fs")


const authentication = (req,res,next)=>{
    const token = req.headers?.authentication?.split(" ")[1]|| req.cookies?.token
    if(token){
        const blacklistdata = fs.readFileSync("./blacklist.json", "utf-8")
        if(blacklistdata.includes(token)){
            return res.send("Please login again")
        }
        jwt.verify(token, process.env.key, function(err, decoded) {
            if(decoded){

                req.body.user_id = decoded.user_id
                req.body.x_userRole =decoded?.role
                next()
            }
            if(err){
                console.log(err)
                res.status(401).send({msg:"please login again","err":err.message})
            }
          });
    }else{
        res.send("login")
    }
}
module.exports = {authentication}