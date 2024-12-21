const passengerTicket = require("../model/PassengerTicket")
const Ticketmodel = require("../model/Ticket")
let Data = {



    generateTenDigitCode: function () {
        const digits = '0123456789';
        let code = '';
        for (let i = 0; i < 10; i++) {
            code += digits.charAt(Math.floor(Math.random() * digits.length));
        }
        return code;
    },

    create_Ticket: function () {
        let station = ["Chennai Central Railway Station", "Chennai Egmore Railway Station", "Pattaravakkam railway station", "Chennai Beach railway station", "Mambalam railway station", "Avadi railway station", "Tambaram railway station", "St Thomas Mount railway station"]

        tickets = []
        pnr_number = []
        while (pnr_number.length != station.length) {
            let value = this.generateTenDigitCode();
            if (!pnr_number.includes(value))
                pnr_number.push(value)
        }
        for (let i = 0; i < station.length; i++) {

            tickets.push({ "pnr_number": pnr_number[i], "boarding_point": station[i], "droping_point": station[i + 1], "train_time": new Date(new Date().getTime()+120000000*i) })
        }

        pnr_number = []
        for (let i = 0; i < tickets.length - 1; i++) {
            // console.log("iteration", { "pnr_number": tickets[i].pnr_number, "boarding_point": tickets[i].boarding_point, "droping_point": tickets[i].droping_point, "train_time": tickets[i].train_time });
            const tm = new Ticketmodel({ "pnr_number": tickets[i].pnr_number, "boarding_point": tickets[i].boarding_point, "droping_point": tickets[i].droping_point, "train_time": tickets[i].train_time });
            tm.save({ runValidators: true });
    
        }
   
        console.log("dummy data created")

    },

    create_PassengerTicket: async function (aadhaar) {

        let res = await passengerTicket.find({aadhaar})
        let ticket = await Ticketmodel.find()

        console.log(ticket)

        if(res.length == 0) {
             
                await passengerTicket.create({aadhaar})
                console.log("passenger created")
        } 
        let ticketList = []
            for(let i=1; i<=5; i++) {

                ticketList.push(ticket[ticket.length-i].pnr_number)
                
            }
            await passengerTicket.updateOne({aadhaar}, {pnr_number: ticketList  })
            console.log(res)
    }
}

module.exports = Data;