import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Authentication route to test our admin and user updates 
// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("hello user, you are logged in")
// })
// // This route basicaly work just to check if the user is authorized and can delete its account
// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete your account")
// })

// // This route basicaly work just to check if the user is an admin and can delete all
// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("hello Admin, you are logged in and you can delete all accounts")
// })


//The verify middleware basically make us restrict some route from user i.e its only admin that can access the routes when we use verifyAdmin
//Update User Route
router.put("/:id", verifyUser, updateUser);
//Delete User Route
router.delete("/:id", verifyUser, deleteUser);
//Get User Route
router.get("/:id", verifyUser, getUser);
//Get all Users Route, its only admin that can access this route
router.get("/", verifyAdmin, getUsers);


export default router