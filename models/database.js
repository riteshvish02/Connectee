const mongoose = require('mongoose');

exports.connectionDB = ()=>{
    try {
        mongoose.connect("mongodb://0.0.0.0/Conectee").then(()=>{
            console.log("Connected to Mongo");
            
        })
    } catch (error) {
        console.log(error);
        
    }
}