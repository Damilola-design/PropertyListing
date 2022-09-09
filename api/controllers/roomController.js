import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";



export const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push: { rooms: savedRoom._id },}); // this function will add the savedroom id  inside the room in the hotel model
        }catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err);
    }
}; 


//Update Room controller
export const updateRoom = async (req,res,next)=>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json(updatedRoom)
    }catch(err){
        next(err);
    }
}

//Update Room availability controller, trying to push the avalaibily date of a particular room
export const updateRoomAvailability = async (req,res,next) => {
    try{
        await Room.updateOne({"roomNumbers._id": req.params.id },
        {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            },
        }
        );
        res.status(200).json("Room status has been updated.")
    }catch(err){
        next(err);
    }
};


// Delete Room Controller
export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id); // this function will the delete the room and room it inside the hotel modal
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$pull: { rooms: req.params.id },}); // this function will delete the savedroom id  inside the room in the hotel model
        }catch(err){
            next(err);
        }
        res.status(200).json("Room has been deleted.");
    }catch(err){
        next(err);
    }
}

//Get a particular Room controller
export const getRoom = async (req,res,next)=>{
    try{
        const room = await Room.findById(req.params.id,);
        res.status(200).json(room)
    }catch(err){
        next(err);
    }
}


//Get a particular all Rooms controller
export const getRooms = async (req,res,next)=>{
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms)
    }catch(err){
       next(err)
    }
}