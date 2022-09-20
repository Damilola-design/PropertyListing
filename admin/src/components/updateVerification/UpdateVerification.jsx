import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useContext, useState } from "react";
// import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router"
import "./updateVerification.css"


//Note: anywhere they're using mapping(map) it means for each
// the setOpen and hotelId is coming from the Hotel.jsx file cause we're redering this file there(Reserve.jsx)
const UpdateVerification = ({setOpen, verifyId, inputs}) => {
    const [info, setInfo] = useState({});
  const navigate = useNavigate();

const handleChange = (e) => {
    setInfo(prev=>({...prev, [e.target.id]: e.target.value }));
  };
      //  the handleClick function would sent the data to the database after clicking on send 
   const handleClick = async (e) =>{
    e.preventDefault();
    try{
      // we make use of cloudinary to save our image file cause mongoDB does not allow image 

      const updateVerification = {
        ...info,
      };
      // we connect to the register user route 
      await axios.put(`/verify/${verifyId}`, updateVerification);
      alert("User was Successfully updated");
    //   navigate("/profile/user");
    }catch(err){
     alert("Email or username already exist");
    }
  };
  return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon 
            icon={faCircleXmark} 
            className="rClose" 
            onClick={() =>setOpen(false)} 
            />
            <span>Select your rooms:</span>
            
                <div className="formInput" key={verifyId}>
                  <label></label>
                  <select id="verified" onChange={handleChange} >
                    <option value="Approve">Approve</option>
                    <option value="Reject">Reject</option>
                </select>
                </div>
             
        <button onClick={handleClick} className="eButton">Update</button>
        </div>
    </div>
  );
};

export default UpdateVerification;