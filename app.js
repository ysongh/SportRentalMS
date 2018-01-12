const express = require("express")
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/sport_app", {useMongoClient: true});

app.use(express.static("public"));
app.set("view engine", "ejs");

let sportSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number
});

let Sport = mongoose.model("Sport", sportSchema);

app.get("/", function(req, res){
    res.render("home");
});

app.get("/sports", function(req, res){
    Sport.find({}, function(err, sports){
        if(err){
            console.log("Error");
        }
        else{
            res.render("sports", {sports: sports});
        }
    });
});

app.get("/sports/new", function(req, res){
    res.render("new");
});

app.post("/sports", function(req, res){
    Sport.create(req.body.sport, function(err, newSport){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/sports");
        }
    });
});

app.get("/sports/:id/edit", function(req, res){
    Sport.findById(req.params.id, function(err, foundSport){
        if(err){
            res.redirect("/sports");
        }
        else{
            res.render("edit", {sport: foundSport});
        }
    });
});

app.put("/sports/:id", function(req, res){
    Sport.findByIdAndUpdate(req.params.id, req.body.sport, function(err, updatedSport){
        if(err){
            res.redirect("/sports");
        }
        else{
            res.redirect("/sports/");
        }
    });
});

app.get("*", function(req, res){
   res.send("Cannot found this page");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("It running");
});