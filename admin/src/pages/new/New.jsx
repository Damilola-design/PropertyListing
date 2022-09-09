import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const New = ({ inputs, title }) => {
  //set state to get image file that would be sent to the DB
  const [file, setFile] = useState("");
// set state to get info, the inputs data 
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

// now we declared value for setainfo, i.e it shoulf pick value that was inputed 
  const handleChange = (e) => {
    setInfo(prev=>({...prev, [e.target.id]: e.target.value }));
  };

  //  the handleClick function would sent the data to the database after clicking on send 
   const handleClick = async (e) =>{
     e.preventDefault();
     const data = new FormData();
     data.append("file", file);
     data.append("upload_preset", "upload");
     try{
       // we make use of cloudinary to save our image file cause mongoDB does not allow image 
       const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/odtechnology-co/image/upload", data);
       
       const { url } = uploadRes.data;

       const newUser = {
         ...info, img: url
       };
       // we connect to the register user route 
       await axios.post("/auth/register", newUser);
       alert("User was Successfully created");
       navigate("/users");
     }catch(err){
      alert("Email or username already exist");
     }
   };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} 
                  type={input.type} 
                  placeholder={input.placeholder}
                  id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
