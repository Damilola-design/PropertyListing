import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

//Create hotel Route, its only admin that can access this route
router.post("/", verifyAdmin, createHotel);
//Update hotel Route, its only admin that can access this route
router.put("/:id", verifyAdmin, updateHotel);
//Delete hotel Route, its only admin that can access this route
router.delete("/:id", verifyAdmin, deleteHotel);
//Get hotel Route
router.get("/find/:id", getHotel);
//Get all hotels Route
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);


export default router;