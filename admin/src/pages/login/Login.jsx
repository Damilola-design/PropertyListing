import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {useNavigate} from "react-router-dom"
import './login.scss'

const Login = () => {
    //creating variables for the inputs and declearing undefined 
    const [ credentials, setCredentials ] = useState({
        username: undefined,
        password: undefined,
    });
    //vairaibles from our authContext file
    const { user, loading, error, dispatch} = useContext(AuthContext);
//Function to navigate to another route once the login is successfull
    const navigate = useNavigate()

    // this function should check etries in the input giving the id for each inputs weather it match the varables created
    const handleChange = (e) =>{
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value }));
    }

    //once the submit button is clicked it should verify all this conditions 
    const handleClick =async (e) =>{
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try{
            //connecting to the login api route from backend using axios
            const res = await axios.post("/auth/login", credentials)
            // a conditional statement before login i.e if the user is admin the login shoulf be successful else the login should fail
            if(res.data.isAdmin) {
              dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
              navigate("/")
            }else {
              dispatch({type: "LOGIN_FAILURE", payload: {message: "You are not allowed!"},
             });
            }
        }catch(err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };
    //  console.log(user);
  return (
    <div className="login">
        <div className="lContainer">
            <input 
            type="text" 
            placeholder="username" 
            id="username" 
            onChange={handleChange} 
            className="lInput" />

            <input 
            type="password" 
            placeholder="password" 
            id="password" 
            onChange={handleChange} 
            className="lInput" />
            <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  );
}

export default Login