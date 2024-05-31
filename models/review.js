const mongoose=require("mongoose");

const Schema= new mongoose.Schema(
    {
        comment:{
            type:String
        },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const reviews=new mongoose.model("reviews",Schema);

module.exports=reviews;