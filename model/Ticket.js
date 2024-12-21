const mongoose = require("mongoose")


const ticket_schema = new mongoose.Schema( {
    pnr_number: {type: Number, unique:true}, 
    boarding_point: {type: String},
    droping_point: {type: String}, 
    train_time: {type: Date},
 

})

const Ticket = mongoose.model("Ticket", ticket_schema);

module.exports = Ticket;