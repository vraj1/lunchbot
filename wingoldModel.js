var mongoose = require('mongoose');



var wingoldSchema = new mongoose.Schema({
    Monday:[{
        item:String,
        diet:String
    }],
    Tuesday:[{
        item:String,
        diet:String
    }],
    Wednesday:[{
        item:String,
        diet:String
    }],
    Thursday:[{
        item:String,
        diet:String
    }],
    Friday:[{
        item:String,
        diet:String
    }]
});

var wingoldModel = mongoose.model("Wingold", wingoldSchema);

module.exports = wingoldModel;