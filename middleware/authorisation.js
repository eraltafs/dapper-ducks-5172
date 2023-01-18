const jwt = require("jsonwebtoken")

const authorise = (permittedRole) => {
     return (req, res, next) => {
        const role = req.body.x_userRole||"user"
        if(permittedRole.includes(role)){
            next()
        }
        else{
            res.send("you are not authorised to do this")
        }
    }
    
}

module.exports = {authorise}