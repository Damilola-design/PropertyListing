import express from "express";
import { login, register } from "../controllers/authController.js"; //make sure to add .js at the back of the filename to avoid error

const router = express.Router();

router.post("/register", register)
router.post("/login", login)



export default router