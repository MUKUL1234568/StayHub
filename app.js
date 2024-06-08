const express = require("express");
const app = express();
const mongoose = require("mongoose");
 
const path = require("path");
const methodOverride= require("method-override");
const ejsMate = require("ejs-mate");
 
 
const listings=require("./routes/listing.js")
const reviews =require("./routes/review.js")
 
main().then((res)=>{console.log("mongo is connect")}).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/lovetoghumna');
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);//to use ejs mate ;
app.use(express.static(path.join(__dirname,"/public")));
app.use("/listing",listings);   //router for "/listing"
app.use("/listing/:id/reviews",reviews); //tgffdsgdsgfsdg
 


//error route 
app.use((err,req,res,next)=>{
    let {statusCode=500, message="something went wrong"}=err;

    res.send("error");
})
app.all("*",(req,res,next)=>{
    // next(new ExpressError(404,"page not found"));
   res.send(" page not found");
})

app.get("/",(req,res)=>{
    res.send("all is working");
});


app.listen(8000,()=>{
    console.log("server is listening at port 8000");
});
