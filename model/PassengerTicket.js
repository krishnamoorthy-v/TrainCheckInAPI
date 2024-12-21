const mongoose = require("mongoose")
const { aadhaar } = require("../Service/ValidateUser")

const passenger_ticket_schema = new mongoose.Schema( {
    aadhaar: {type: Number, unique: true},
    pnr_number: [{type: Number}],

})

const passengerTicket = mongoose.model("passengerTicket", passenger_ticket_schema )
module.exports = passengerTicket