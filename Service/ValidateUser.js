
const userModel = require("../model/User")
let validate = {

    ok: 1,
    invalid: -1,
    alreadExits: 0,

    email: async function(v) {
        if(/^\S+@\S+\.\S+$/.test(v)) {
            let res = await userModel.find({"email": v})
            // console.log(res);
            if(res.length == 0) {
                return this.ok;
            } 
            return this.alreadExits;

        } 
        return this.invalid;
    },


    mobile: async function(v) {
        if(String(v).length == 10) {
            let res = await userModel.find({"mobile": v})
            if(res.length == 0) {
                return this.ok;
            }
            return this.alreadExits
        }
        return this.invalid;
    },

    aadhaar: async function(v) {
        if(String(v).length == 12) {
            let res = await userModel.find({"aadhaar": v})
            if(res.length == 0) {
                return this.ok;
            }
            return this.alreadExits
        }
        return this.invalid;
    }
}

module.exports = validate;