const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const homePage = require("./routes/homePage");
const WingoldInput = require("./models/wingoldModel");

const path = require('path');
const PORT = 5000;

//mongo connection setup 
mongoose.connect("mongodb://vraj.patel:Soc-Nud4@ds143953.mlab.com:43953/lunch_menu", { useNewUrlParser: true })
    .then(function(){
        console.log("Database connection successful");
    });


//Express Setup 
var app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
//app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.json());
app.use(homePage);

app.use(express.static('./'));


//PORT connection
app.listen(PORT, function(){
    console.log("Listening on Port: " + PORT);
})