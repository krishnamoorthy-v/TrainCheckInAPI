const express = require("express")
const router = express.Router();
const userModel = require("../model/User");
const User = require("../model/User");
const validateUser = require("../Service/ValidateUser");
const { generateToken } = require("../Service/JWTservices");

router.post("/signup", async(req, res) => {
    try {
        const {name, email, mobile, aadhaar, password} = req.body;
        console.log({name, email, mobile, aadhaar, password})

        let emailStatus = await validateUser.email(email)
        let mobileStatus = await validateUser.mobile(mobile)
        let aadhaarStatus = await validateUser.aadhaar(aadhaar)

        // console.log(emailStatus)
        if(emailStatus == -1) {
            throw new Error("Invalid Email id");
        } else if(emailStatus == 0) {
            throw new Error("Email id already exits");
        }

        if(mobileStatus == -1) {
            throw new Error("Invalid mobile number")
        } else if(mobileStatus == 0) {
            throw new Error("Mobile number already exits")
        }

        if(aadhaarStatus == -1) {
            throw new Error("Invalid aadhaarStatus")
        } else if(aadhaarStatus == 0) {
            throw new Error("Aadhaar number already exits")
        }

        console.log("************************************")
        const data = new userModel( {name, email, mobile, aadhaar, password} )
        data.save({runValidators: true})
        .then( (result)=> {
            return res.status(200).json({"error": false, "message": "successfully created"})
        })
        .catch( (err)=> {
            console.error(`Error while Running ${err.message}`)
            return res.status(400).json({"error": true, "message": err.message})
        })
    } catch( err) {
        console.error(err);
        return res.status(400).json({"error": true, "message": err.message})
    }
})


router.post("/login", async(req, res)=> {
    try {

        const {email, password} = req.body;
        console.log({email, password})

        let result = await userModel.findOne({"email": email})
        console.log(result)
        // console.log(await result.isValidPassword(password))
        if(!result || !await result.isValidPassword(password)) {
            throw new Error("Invalid login id or password")
        }

        const token = generateToken(result);
        return res.status(200).json({"error": false, "message": token})

    } catch(err) {
        console.error(err);
        return res.status(400).json({"error": true, "message": err.message})
    }
})
module.exports = router;