import User from "../models/User.js";
import Verify from "../models/Verify.js";


//create Verification controller
export const createVerify = async (req,res,next)=>{
    const userId = req.params.userid;
    const newVerify = new Verify(req.body)
    try{
        const savedVerify = await newVerify.save();
        try{
            await User.findByIdAndUpdate(userId, {$set: { verified: savedVerify.verified },});// this function will add the savedroom id  inside the room in the hotel model
        }catch(err){
            next(err);
        }
        res.status(200).json(savedVerify);
    }catch(err){
        next(err);
    }
}

//Get a particular all Verification controller
export const getVerifications = async (req,res,next)=>{
    try{
        const verifications = await Verify.find();
        res.status(200).json(verifications)
    }catch(err){
       next(err)
    }
}

//Update Verification controller
export const updateVerification = async (req,res,next)=>{
    const userID = req.body.userId;
    try{
        const updatedVerification = await Verify.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        try{
            await User.findByIdAndUpdate(userID, {$set: { verified: updatedVerification.verified },});// this function will add the savedroom id  inside the room in the hotel model
        }catch(err){
            next(err);
        }
        res.status(200).json(updatedVerification)
    }catch(err){
        next(err);
    }
}

// Delete Verification Details Controller
export const deleteVerification = async (req,res,next)=>{
    try{
        await Verify.findByIdAndDelete(req.params.id);
        res.status(200).json("Details has been deleted.");
    }catch(err){
        next(err);
    }
}

//Get a particular Verification controller
export const getVerification = async (req,res,next)=>{
    try{
        const verification = await Verify.findById(req.params.id,);
        res.status(200).json(verification)
    }catch(err){
        next(err);
    }
}