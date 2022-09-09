import Hotel from "../models/Hotel.js ";
import Room from "../models/Room.js ";

//create Hotel controller
export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    }catch(err){
        next(err);
    }
}


//Update Hotel controller
export const updateHotel = async (req,res,next)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json(updatedHotel)
    }catch(err){
        next(err);
    }
}


// Delete Hotel Controller
export const deleteHotel = async (req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    }catch(err){
        next(err);
    }
}

//Get a particular Hotel controller
export const getHotel = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id,);
        res.status(200).json(hotel)
    }catch(err){
        next(err);
    }
}


//Get a particular all Hotels controller
export const getHotels = async (req,res,next)=>{
    const { min, max, ...others } = req.query;
    try{
        const hotels = await Hotel.find({...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 2000},}).limit(req.query.limit);
        res.status(200).json(hotels)
    }catch(err){
       next(err)
    }
}

// Count function, to simply count item in the Hotel table database
export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        const hotels = await Hotel.find();
        res.status(200).json(list)
    }catch(err){
       next(err)
    }
}

// this function basically count the categories in the hotel Type entry in the hotel DB
export const countByType = async (req,res,next)=>{
    try{
    const hotelCount = await Hotel.countDocuments({type: "hotel"});
    const ApartmentCount = await Hotel.countDocuments({type: "apartment"});
    const resortCount = await Hotel.countDocuments({type: "resort"});
    const villaCount = await Hotel.countDocuments({type: "villa"});
    const cabinCount = await Hotel.countDocuments({type: "cabin"});

        res.status(200).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: ApartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount},
        ]);
    }catch(err){
       next(err)
    }
};

// this function will pass hotel id inside the rooms input in the hotel model
export const getHotelRooms = async (req, res, next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room);
        })
        );
        res.status(200).json(list);
    }catch(err){
       next(err) 
    }
};  

