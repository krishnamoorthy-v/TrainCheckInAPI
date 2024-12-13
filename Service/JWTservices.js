const jwt = require("jsonwebtoken");
const userModel = require("../model/User")
const secret = "qwertUikapdfnaudfanfdauf.ila.lkjfadfn";


function generateToken(user) {
   return jwt.sign( {_id: user.id }, secret, {expiresIn: "1h"});
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

const authorize = () => {
    return( (req, res, next) => {
        try {

            const {email} = req.body;

            const res = userModel.findOne({"email": email})
            
            if(!req.headers["authorization"]) {
                throw new Error("Forbidden")
            }
            const token = req.headers["authorization"].split(" ")[1];
            const token_info = verifyToken(token);
            
            console.log("form authorize ", token_info["_id"] == res._id)
            if( token_info["_id"] == res._id ) {
               
                next();
            } else {
                throw new Error("Forbidden");
            }
        } catch(err) {
            res.status(400).json({"Failure":err.message});
        }
    });
};

module.exports = {authorize, verifyToken, generateToken};