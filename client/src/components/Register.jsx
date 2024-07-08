import React, { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import EmailIcon from "@mui/icons-material/Email";
import { TextField } from "@mui/material";
import "../styles/register.css";
import "react-toastify/dist/ReactToastify.css";

const userRegisterSuccess = () => {
  toast.success("Registered successfully!");
};

const userRegisterFail = () => {
  toast.error("Failed to register!");
};

const Register = ({ setShowRegister }) => {
  const nameRef = useRef();
  const mailRef = useRef();
  const pasRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      userName: nameRef.current.value,
      email: mailRef.current.value,
      password: pasRef.current.value,
    };
    try {
      const response = await axios.post("/api/register", newUser, {
        withCredentials: true,
      });
      userRegisterSuccess();
      setShowRegister(false);
    } catch (error) {
      userRegisterFail();
    }
  };
  return (
    <div className="register_container">
        <div className="header">
            <ExitToAppIcon sx={{mr: '5px'}} />
            Create a profile
        </div>
        <form onSubmit={handleSubmit}>
        <div className="input_wrapper">
            <AccountCircleIcon  sx={{mr: '5px'}} />
            <TextField id="standard-basic" label="Username" variant="standard" sx={{width: 1}} inputRef={nameRef}/>
        </div>
        <div className="input_wrapper">
            <EmailIcon  sx={{ mr: '5px' }}/>
            <TextField id="standard-basic" label="Email" variant="standard" sx={{width: 1}} inputRef={mailRef}/>
        </div>
        <div className="input_wrapper">
            <HttpsOutlinedIcon sx={{ mr: '5px' }} />
            <TextField id="standard-basic" label="Password" variant="standard" sx={{width: 1}} inputRef={pasRef}/>
        </div>
            <button className="register_btn" >Register</button>
        </form>
        <CancelIcon className="register_cancel" onClick={() => setShowRegister(false)}/>
    </div>
  );
};
export default Register;
