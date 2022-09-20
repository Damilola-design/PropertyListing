import express from "express";
import { createVerify, deleteVerification, getVerification, getVerifications, updateVerification } from "../controllers/verifyController.js"; //make sure to add .js at the back of the filename to avoid error
import { verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:userid", createVerify);
//Get all verification Route, its only admin that can access this route
router.get("/", verifyAdmin, getVerifications);

//Update verification Route
router.put("/:id", verifyAdmin, updateVerification);

//Delete verification Route
router.delete("/:id", verifyAdmin, deleteVerification);

//Get verification Route
router.get("/:id", verifyAdmin, getVerification);

export default router;