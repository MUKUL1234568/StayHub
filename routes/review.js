const express = require("express");
const router =express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError= require("../utils/expressError.js");
const review= require("../models/review.js")

router.delete("/:reid", async(req,res)=>{
    let {id,reid}=req.params;
    await Listing.findByIdAndUpdate(id ,{$pull: {reviews:reid}});
    await review.findByIdAndDelete(reid);
    res.redirect(`/listing/${id}`);

})

router.post("/", async(req,res)=>{
   let {id}=req.params;
   console.log(await Listing.findById(id));
        
   const results= new review(req.body.review);
   console.log(results);
   await results.save();

   //    let id=req.params;
      let   listing =await  Listing.findById(id).populate("reviews");

      listing.reviews.push(results);
      listing =  await listing.save();
    console.log(listing);
    res.redirect(`/listing/${id}`);
})


module.exports=router;