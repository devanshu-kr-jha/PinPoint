import React, { useRef } from "react";
import axios from "axios";
import '../styles/login.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { TextField } from "@mui/material";
import {Button} from "@mui/material";



import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const userLoginSuccess = () => {
    toast.success("Login successfully!")
  }
  
  const userLoginFail = () => {
    toast.error("Login failed!")
  }

const Login = ({setShowLogin, setCurrentUser}) => {
    const nameRef = useRef()
    const pasRef = useRef()

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const checkUser = {
            userName: nameRef.current.value,
            password: pasRef.current.value
        }
        try {
            const response = await axios.post('http://localhost:5000/api/login', checkUser)
            userLoginSuccess()
            setShowLogin(false)
            setCurrentUser(response.data.userName)
        } catch (error) {
            userLoginFail()
        }
    }
    return (
        <div className="login_container">
            <div className="header">
                <ExitToAppIcon sx={{mr: '5px'}}/>
                Login to your profile 
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input_wrapper">
                <AccountCircleIcon  sx={{mr: '5px'}} />
                <TextField id="standard-basic" label="Username" variant="standard" sx={{width: 1}} inputRef={nameRef}/>
                </div>
                <div className="input_wrapper">
                <HttpsOutlinedIcon sx={{ mr: '5px' }} />
                <TextField id="outlined-password-input" label="Password" variant="standard" sx={{width: 1}} type="password" inputRef={pasRef}/>
                </div>
                <button className="login_btn">Submit</button>
            </form>
            <CancelIcon className="login_cancel" onClick={() => setShowLogin(false)}/>
        </div>
    )
}
export default Login