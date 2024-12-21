const express = require("express")
const otpGenerator = require("otp-generator")
const OTPModel = require("../model/OTPmodel");
const userModel = require("../model/User");


const router = express.Router();


// const accountSid = "enter account sid";
// const authToken = "enter auth token";

const PHONE_NUMB = "+13613664586"

const client = require('twilio')(accountSid, authToken);

router.get("/sms/otp/:id", async(req, res) => {

    try {
        const {id} = req.params;
        console.log(id)
        let result = await userModel.findOne({"_id": id})
        console.log(result.mobile);



        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });


        const sendSMS = async (otp) => {
              
                let msgOptions = {
                    body: `Railway Check In OTP: ${otp}`,
                    from: PHONE_NUMB,
                    to: "+916381272242"
                }


                let result = await client.messages.create(msgOptions);
                new OTPModel({user_id: id, otp: otp}).save();
                return res.status(200).json({"error": false, "message": "otp sended successfully"})
            };       
        sendSMS(otp);
    } catch(error) {
        console.error(error)
        return res.status(400).json({"error": true, "message": error.message })
    }

})

router.post("/sms/otp/verify/:user_id", async(req, res)=> {

    try {
        const {user_id} = req.params;
        const {otp} = req.body;

        const result = await OTPModel.find({user_id})
        console.log(new Date().getTime() - result[result.length-1].createdAt.getTime() <= 10 * 60 * 1000, "     ", result[result.length-1].otp == otp)
        
        if(result[result.length-1].otp == otp && (new Date().getTime() - result[result.length-1].createdAt.getTime() <= 10 * 60 * 1000)) {
            return res.status(200).json({"error": false, "message": "Verified"});
        } else {
            return res.status(400).json({"error": true, "message": "Invalid OTP or expired"})
        }


    } catch(error) {
        console.error(error);
        return res.status(400).json({"error": true, "message": error.message})
    }

})

module.exports = router;