const express = require("express")
const Data = require("../Service/DummyData")
const Ticketmodel = require("../model/Ticket");
const passengerTicket = require("../model/PassengerTicket");
const route = express.Router();

route.get("/pnr/:pnr_number", async (req, res)=> {
    try {

        const {pnr_number} = req.params;
        console.log(pnr_number)
        let result = await Ticketmodel.findOne({pnr_number})
        console.log(result)
        if(!result) {
            throw new Error("Pnr not available")
        }
        return res.status(200).json({"pnr_number": result.pnr_number, "boarding_point": result.boarding_point, "droping_point": result.droping_point, "train_time": result.train_time})

    } catch(error) {
        console.error("Error occure while pnr get call: ", error.message);
        return res.status(400).json({"error": true, "message": error.message});
    }
})

route.get("/passenger/:aadhaar/:date", async (req, res) => {
    
    try {
        const {aadhaar, date} = req.params;
        let result = await passengerTicket.findOne({aadhaar})
        console.log(result)
        if(!result) {
            throw new Error("User not found");
        } 
        // console.log(new Date(date))
        // console.log(date+"T00:00:00.000Z")
        // console.log(result.pnr_number)
        let startDate = new Date(date)
        let endDate = new Date(date)
        endDate.setDate( endDate.getDate() + 1)

        console.log(startDate, endDate)
        let ticket = await Ticketmodel.aggregate([
            {
                $match: {pnr_number: {$in: result.pnr_number}, train_time: { $gte: startDate, $lt: endDate} }
            }
        ])

        let ticket_list = []
        ticket.forEach(ele => ticket_list.push(ele.pnr_number))

        return res.status(200).json({"aadhaar": aadhaar, "pnr_number": ticket_list})
    } catch(error) {
        console.error("Error occure while get passenger ticket: ", error.message);
        return res.status(400).json({"error": true, "message": error.message})
    }
})

route.post("/pnr", async (req, res)=> {
    try {

        let tickets = Data.create_Ticket()

        for(let i=0; i<tickets.length; i++) {

            new Ticketmodel({"pnr_number": tickets[i].pnr_number, "boarding_point": tickets[i].boarding_point, "droping_point": tickets[i].droping_point, "train_time": tickets[i].train_time}).save({runValidators: true});

        }
        return res.status(200).json({"error": false, "message": "Data stored successfully"})


    } catch(error) {
        console.error("Error while pnr post call ", error.message)
        return res.status(400).json({"error": true, "message": error.message})
    }
})

module.exports = route;