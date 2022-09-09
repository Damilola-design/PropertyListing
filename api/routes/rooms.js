import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js ";

const router = express.Router();

//Create hotel Route, its only admin that can access this route
router.post("/:hotelid", verifyAdmin, createRoom);
//Update Room Route, its only admin that can access this route
router.put("/:id", verifyAdmin, updateRoom);

//Update Room Avalaibility Route, its  user that can access this route
router.put("/availability/:id", updateRoomAvailability);
//Delete Room Route, its only admin that can access this route
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//Get Room Route
router.get("/:id", getRoom);
//Get all Rooms Route
router.get("/", getRooms);


export default router