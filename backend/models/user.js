//schema for collection

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    }
})
mongoose.model("User",userSchema)