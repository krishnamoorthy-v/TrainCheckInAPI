const passengerTicket = require("../model/PassengerTicket")

let Data = {

    generateTenDigitCode: function() { 
         const digits = '0123456789'; 
         let code = ''; 
         for (let i = 0; i < 10; i++) { 
            code += digits.charAt(Math.floor(Math.random() * digits.length)); 
        } 
        return code;
     },

    create_PassengerTicket: async function(aadhaar, n){
        let pnr_number = []
        for(let i=0; i<n; i++) {
            pnr_number.push( this.generateTenDigitCode() )
        }
        console.log(pnr_number)
        let response = new passengerTicket({aadhaar, pnr_number})
        response.save();
    }
}

module.exports = Data;