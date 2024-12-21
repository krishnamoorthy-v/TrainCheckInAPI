const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const userRoute = require("./routes/User")
const checkinRoute = require("./routes/CheckIn")
const ticketRoute = require("./routes/Ticket");

const PORT = 9000;
const IP = "192.168.63.1",
app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/train", {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {console.log("Connected to Mongodb")})
.catch((error)=>{console.error(`Error while Connecting with mongodb ${error} `)})

app.use("/account", userRoute)
app.use("/checkin", checkinRoute)
app.use("/ticket", ticketRoute)

app.listen(PORT, IP, ()=> {
    console.log(`Server running on the port ${PORT}.`)
})