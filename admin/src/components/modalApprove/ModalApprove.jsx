import axios from "axios";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router";
import "./modalApprove.css"

const ModalApprove = ({ setOpenModal, verifyId}) => {

    const location = useLocation();
    //selecting the second array item in the location path
    const path = location.pathname.split("/")[2];
    const {data, loading, error } = useFetch(`/verify/${path}`)
    console.log(data);
    const userId = data.user_id;
     
  const navigate = useNavigate();
 //  the handleClick function would sent the data to the database after clicking on send 
   const handleClick = async (e) =>{
    e.preventDefault();  
    try{
        // update the verified row in the verify MODEL
      const updateVerification = {
        verified: "Approved",
        userId
      };
      // we connect to the register user route 
      await axios.put(`/verify/${verifyId}`, updateVerification);
      alert("User was Successfully Approved");
       navigate("/verify");
    }catch(err){
     alert("Email or username already exist");
    }
  };
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>Are You Sure You Want to Verify this user?</h1>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={handleClick}>Continue</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ModalApprove;