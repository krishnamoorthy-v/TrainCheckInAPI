const mongoose = require("mongoose")

const otp_schema = new mongoose.Schema( {
    user_id: {type: mongoose.Types.ObjectId, ref:"User"},
    otp: {type:Number}
}, {
    timestamps: true
})

const OTPmodel = mongoose.model("OTP", otp_schema)

module.exports = OTPmodel;