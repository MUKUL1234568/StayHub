const express = require("express");
const router =express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError= require("../utils/expressError.js");
//route for view all the listin ;
router.get("/",wrapAsync(async(req,res)=>{
    let alllisting = await Listing.find({});
    //console.log(alllisting);
    console.log(alllisting.image)
    res.render("./listings/index.ejs",{alllisting});
}))
 
//create new list route
router.get("/new",(req,res)=>{
    res.render("./listings/new.ejs");
})
//push new list item into actual db
router.post("/",wrapAsync( async(req,res,next)=>{
    //try{
        const newListing = new Listing(req.body.listing);
        const deurl= 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60';
        newListing.image.url=newListing.image.url||deurl;
    newListing.save();
    res.redirect("/listing");

    //}
    //catch(err){
  //next(err);
   // }
    }))
//show route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
   let listing =await Listing.findById(id).populate("reviews");
  // console.log(listing);
   res.render("./listings/show.ejs",{listing});
}))
//edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id}= req.params;
    let listing =await Listing.findById(id);
    console.log(listing);
   res.render("./listings/edit.ejs",{listing});
}));

//update route
router.put("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listing/${id}`);
}));

//delete route 
router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id}= req.params;
     let deletedlist =await Listing.findByIdAndDelete(id);
     console.log(deletedlist);
     res.redirect("/listing");
}))


//error route 
// app.use((err,req,res,next)=>{
//     let {statusCode=500, message="something went wrong"}=err;

//     res.render("/error.ejs");
// })

module.exports=router;