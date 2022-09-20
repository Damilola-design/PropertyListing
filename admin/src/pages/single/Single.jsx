import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router";
import ModalApprove from "../../components/modalApprove/ModalApprove"
import ModalReject from "../../components/modalReject/ModalReject"
import { useState } from "react";

const Single = () => {
  const [modalApprove, setModalApprove] = useState(false);
  const [modalReject, setModalReject] = useState(false);
  const location = useLocation();
 
  //selecting the second array item in the location path
  const path = location.pathname.split("/")[2];
  const {data, loading, error } = useFetch(`/verify/${path}`)
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">ID Type:</span>
                  <span className="itemValue">
                    {data.type}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{data.verified}</span>
                </div>
                <div className="detailItem">
                  <button className="ApproveBtn"
                  onClick={() => {
                    setModalApprove(true);
                  }}
                  >Approve</button>
                  {modalApprove && <ModalApprove setOpenModal={setModalApprove} verifyId={path} />}
                  <button className="RejectBtn"
                  onClick={() => {
                    setModalReject(true);
                  }}
                  >Reject</button> 
                  {modalReject && <ModalReject setOpenRejectModal={setModalReject} verifyId={path} />}              
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          </div>
        </div>
         <div className="bottom">
        <h1 className="title">Identity Image</h1>
            <img
                src={data.photo}
                alt=""
                className="itemImg"
              />
        </div> 
      </div>
    </div>
  );
};

export default Single;
