const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("express").Router(); 
const wingoldModel = require("../models/wingoldModel");

router.get("/", function (req,res){
    console.log(req.body);
    res.render("home.ejs");
});

router.get("/Wingold", function(req, res){
    res.render("weekdays.ejs");
});

router.get("/Wingold/:weekday", function(req, res){
    var weekday = req.params.weekday;
    res.render("Wingold.ejs");
})

router.post("/Wingold/:weekday", function(req, res){
    console.log(req.body);
    var data = req.body;
    var weekday = req.params.weekday;
    wingoldModel.findOne().exec()
        .then(function(result){
            if(result){
            console.log("found");
            switch(weekday){
                case 'Monday':
                    result.Monday = req.body;
                    break;
                case 'Tuesday':
                    result.Tuesday = req.body;
                    break;
                case 'Wednesday':
                    result.Wednesday = req.body;
                    break;
                case 'Thursday':
                    result.Thursday = req.body;
                    break;
                case 'Friday':
                    result.Friday = req.body;
                    break;
            }
        result.save();
        }

        else{
            var wingoldDb = new wingoldModel({
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: []
            });


            switch(weekday){
                case 'Monday':
                    wingoldDb.Monday = req.body;
                    break;
                case 'Tuesday':
                    wingoldDb.Tuesday = req.body;
                    break;
                case 'Wednesday':
                    wingoldDb.Wednesday = req.body;
                    break;
                case 'Thursday':
                    wingoldDb.Thursday = req.body;
                    break;
                case 'Friday':
                    wingoldDb.Friday = req.body;
                    break;
            }
        
        
            wingoldDb.save()
            .then(function(item){
                res.send("Item saved");
            })
            .catch(function(err){
                console.log(err);
                res.send("Item not saved");
            })
        }
    })

});

router.get('/Wingolddata', function(req, res){
    res.render("wingoldData.ejs");
});

router.post('/', function(req, res){
    
    var data = {};
    var text = req.body.text;
    console.log(text);
    wingoldModel.find({}, function(err, entries){
        //text = "Monday" + JSON.stringify(entries[0].Monday)
        //JSON.stringify(entries);


    

        var monday = entries[0].Monday;
        var tuesday = entries[0].Tuesday;
        var wednesday = entries[0].Wednesday;
        var thursday = entries[0].Thursday;
        var friday = entries[0].Friday;

       

        var output;

       var menuInputTime = 9;
       var time = new Date();
       var currentHour = time.getHours();
       var currentMinutes = time.getMinutes();
       
        
        if(text === undefined || text === "" || text === "today" || text === "Today"){
            console.log(currentHour);
            var today = new Date();
            var day = today.getDay(); //returns index of current day
            var daylist = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var currDay = daylist[day];
            console.log(currDay);
            output = "";
            switch(currDay){
                case 'Monday':
                    output += "Monday: " + "\n" + "\t";
                    for(var i =0; i < monday.length; i++){
                        console.log(output);
                        output += "Food: " + monday[i].item + "\n" + "\t" + "Dietary Restriction: " + monday[i].diet + "\n" + "------------------------" + "\n" + "\t";
                    }
                    break;
                case 'Tuesday':
                    output += "\b" + "Tuesday: " + "\n" + "\t";
                    for(var i =0; i < tuesday.length; i++){
                        console.log(output);
                        output += "Food: " + tuesday[i].item + "\n" + "\t" + "Dietary Restriction: " + tuesday[i].diet + "\n" + "------------------------" + "\n" + "\t";
                    }
                    break;
                case 'Wednesday':
                    output += "\b" + "Wednesday: " + "\n" + "\t";
                    for(var i =0; i < wednesday.length; i++){
                        console.log(output);
                        output += "Food: " + wednesday[i].item + "\n" + "\t" + "Dietary Restriction: " + wednesday[i].diet + "\n" + "------------------------" + "\n" + "\t";
                    }
                    break;
                case 'Thursday':
                    output += "\b" + "Thursday: " + "\n" + "\t";
                    for(var i =0; i < thursday.length; i++){
                        console.log(output);
                        output += "Food: " + thursday[i].item + "\n" + "\t" + "Dietary Restriction: " + thursday[i].diet + "\n" + "------------------------" + "\n" + "\t";
                    }   
                    break;
                case 'Friday':
                    output += "\b" + "Friday: " + "\n" + "\t";
                    for(var i =0; i < tuesday.length; i++){
                        console.log(output);
                        output += "Food: " + friday[i].item + "\n" + "\t" + "Dietary Restriction: " + friday[i].diet + "\n" + "------------------------" + "\n" + "\t";
                    }   
                    break;
            }

            if((currentHour < menuInputTime) && currDay == 'Monday'){
                output = "Sorry lunch has not been inputted for this week";
            }
        }

        if(text === 'Monday' || text === 'monday'){
            //var parsed = JSON.parse(monday);
            console.log(monday);
            //output = "Monday: " + "Food: "+ monday[1].item + "\n"+ "\t" +  "Dietary Restriction: "+ monday[0].diet;
            output = "Monday: " + "\n" + "\t";
            /*var items = monday[0];
            items.forEach(function(item){
                output += item.item + " " + item.diet;
            })*/

            for(var i =0; i < monday.length; i++){
                console.log(output);
                output += "Food: " + monday[i].item + "\n" + "\t" + "Dietary Restriction: " + monday[i].diet + "\n" + "------------------------" + "\n" + "\t";
            }
        }

        if(text === 'Tuesday' || text === 'tuesday'){
            //output = "Tuesday: " + tuesday;
            //output = "Tuesday: " + "Food: "+ tuesday[0].item + "\n"+ "\t" +  "Dietary Restriction: "+ tuesday[0].diet;
            output = "Tuesday: " + "\n" + "\t";
            for(var i =0; i < tuesday.length; i++){
                console.log(output);
                output += "Food: " + tuesday[i].item + "\n" + "\t" + "Dietary Restriction: " + tuesday[i].diet + "\n" + "------------------------" + "\n" + "\t";
            }

        }


        if(text === 'Wednesday' || text === 'wednesday'){
            //output = "Wednesday: " + wednesday;
            //output = "Wednesday: " + "Food: "+ wednesday[0].item + "\n"+ "\t" +  "Dietary Restriction: "+ wednesday[0].diet;
            output = "Wednesday: " + "\n" + "\t";
            for(var i =0; i < wednesday.length; i++){
                console.log(output);
                output += "Food: " + wednesday[i].item + "\n" + "\t" + "Dietary Restriction: " + wednesday[i].diet + "\n" + "------------------------" + "\n" + "\t";
            }

        }

        if(text === 'Thursday' || text === 'thursday'){
            //output = "Thursday: " + thursday;
            //output = "Thursday: " + "Food: "+ thursday[0].item + "\n"+ "\t" +  "Dietary Restriction: "+ thursday[0].diet;
            output = "Thursday: " + "\n" + "\t";
            for(var i =0; i < thursday.length; i++){
                console.log(output);
                output += "Food: " + thursday[i].item + "\n" + "\t" + "Dietary Restriction: " + thursday[i].diet + "\n" + "------------------------" + "\n" + "\t";
            }

        }

        if(text === 'Friday' || text === 'friday'){
            //output = "Friday: " + friday;
            //output = "Friday: " + "Food: "+ Friday[0].item + "\n"+ "\t" +  "Dietary Restriction: "+ Friday[0].diet;
            output = "Friday: " + "\n" + "\t";
            for(var i =0; i < tuesday.length; i++){
                console.log(output);
                output += "Food: " + friday[i].item + "\n" + "\t" + "Dietary Restriction: " + friday[i].diet + "\n" + "------------------------" + "\n" + "\t";
            }

        }


        if(text === 'week'){
            //output = "Monday: " + monday + "\n" + "Tuesday: " + tuesday + "\n" + "Wednesday: " + wednesday + "\n" + "Thursday: " + thursday + "\n" + "Friday: " + friday; 
            output = "";

            output += "Monday: " + "\n" + "\t";
            for(var i =0; i < monday.length; i++){
                console.log(output);
                output += "Food: " + monday[i].item + "\n" + "\t" + "Dietary Restriction: " + monday[i].diet + "\n" + "------------------------" + "\n" + "\t";
            }

            output += "\b" + "Tuesday: " + "\n" + "\t";
            for(var i =0; i < tuesday.length; i++){
                console.log(output);
                output += "Food: " + tuesday[i].item + "\n" + "\t" + "Dietary Restriction: " + tuesday[i].diet + "\n" + "------------------------" + "\n" + "\t";
            }

            output += "\b" + "Wednesday: " + "\n" + "\t";
            for(var i =0; i < wednesday.length; i++){
                console.log(output);
                output += "Food: " + wednesday[i].item + "\n" + "\t" + "Dietary Restriction: " + wednesday[i].diet + "\n" + "------------------------" + "\n" + "\t";
            }


            output += "\b" + "Thursday: " + "\n" + "\t";
            for(var i =0; i < thursday.length; i++){
                console.log(output);
                output += "Food: " + thursday[i].item + "\n" + "\t" + "Dietary Restriction: " + thursday[i].diet + "\n" + "------------------------" + "\n" + "\t";
            }

            output += "\b" + "Friday: " + "\n" + "\t";
            for(var i =0; i < friday.length; i++){
                console.log(output);
                output += "Food: " + friday[i].item + "\n" + "\t" + "Dietary Restriction: " + friday[i].diet + "\n" + "------------------------" + "\n" + "\t";
            }



        }

        /*else {
            output = "Please enter a valid day of the week ie. Monday or monday OR enter 'week' for entire week's menu";
        }*/


        data = {
            response_type: 'in_channel',
            //text: "Food"
            text: output
        }
        
        /*data = {
            response_type: 'in_channel',
            Monday: entries[0].Monday,
            Tuesday: entries[0].Tuesday,
            Wednesday: entries[0].Wednesday,
            Thursday: entries[0].Thursday,
            Friday: entries[0].Friday
        }*/
    

    
        console.log(data);
        res.json(data);
    })



    


});



module.exports = router;

/*router.get("/KW", function(req, res){
    res.render("KW.ejs");
})*/
