const express = require("express")
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/sport_app");

var sports = ["Ping Pong Ball"];
 
app.use(express.static("public"));
app.set("view engine", "ejs");

let sportSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number
});

let Sport = mongoose.model("Sport", sportSchema);

/*Sport.create({
   name:"Ping Pong Ball",
   description: "A small ball for table tennis.",
   quantity: 10
}, function(err, sport){
    if(err){
        console.log("Oh no, error");
        console.log(err);
    }
    else{
        console.log(sport);
    }
});*/

Sport.find({}, function(err, sport){
    if(err){
        console.log("Oh no, error");
        console.log(err);
    }
    else{
        console.log("All the sport.....");
        console.log(sport);
    }
});

app.get("/", function(req, res){
    res.render("home"); 
});

app.post("/addsport", function(req, res){
    var newsport = req.body.newsport;
    sports.push(newsport);
    res.redirect("/sports");
});

app.get("/sports", function(req, res){
    res.render("sports", {sports: sports});
});

app.get("*", function(req, res){
   res.send("Cannot found this page"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("It running"); 
});