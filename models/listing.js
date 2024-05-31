const mongoose = require("mongoose");

const listingSchema= new mongoose.Schema({
    title:{type:String,require:true,default:"no title"},
    description:{type:String,default:""},
    
    image: {
        filename: String,
        url: String,
        
    },
    price:{type:Number,default:100},
    location:{type:String,default:""},
    country:{type:String,default:""},
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews"
    }
]
    
});

const Listing = new mongoose.model("listings",listingSchema);

module.exports=Listing;