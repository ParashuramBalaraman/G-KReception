const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://boompow13579:t5HLzcGNrmDXVQHe@receptionrsvp.czjf05z.mongodb.net/?retryWrites=true&w=majority")

//RSVP Schema
const rsvpSchema = {
    attendees: Array,
    requirements: String,
    phone: String,
}

const RSVP = mongoose.model("Rsvp", rsvpSchema);

app.get("/", function(req, res){
    //res.send("server is working");
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    console.log("Posted");
    console.log(req.body.requirements);
    let newRSVP = new RSVP({
        attendees: req.body.attendees,
        requirements: req.body.requirements,
        phone: req.body.phone,
    })
    newRSVP.save();
    res.redirect("/");
})

app.listen(5000, function() {
    console.log("server is running on 5000");
})