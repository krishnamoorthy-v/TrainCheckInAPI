const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const user_schema = new mongoose.Schema( {
    name: {type:String, require: [true, "name required"]},
    email: {type:String, require: [true, "email required"], unique: [true,"email id already"], match:[/^\S+@\S+\.\S+$/, 'Please use a valid email address.']},
    mobile: {type:Number, require: [true, "mobile required"], unique: true},
    aadhaar: {type:Number, require: [true, "aadhaar required"], unique: true},
    password: {type:String, require: [true, "password required"]}
})

user_schema.pre("save", async function(next){

    if(!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})


user_schema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", user_schema)
module.exports = User;