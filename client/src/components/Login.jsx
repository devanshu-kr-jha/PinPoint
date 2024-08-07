import { useRef } from "react";
import axios from "axios";
import "../styles/login.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { TextField } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userLoginSuccess = () => {
  toast.success("Login successfully!");
};

const userLoginFail = () => {
  toast.error("Login failed!");
};

const Login = ({ setShowLogin, setCurrentUser }) => {
  const nameRef = useRef();
  const pasRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkUser = {
      userName: nameRef.current.value,
      password: pasRef.current.value,
    };
    try {
      const response = await axios.post("/api/login", checkUser, {
        withCredentials: true,
      });
      const { user } = response.data;
      setShowLogin(false);
      userLoginSuccess();
      setCurrentUser(user.userName);
    } catch (error) {
      userLoginFail();
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        <ExitToAppIcon sx={{ marginRight: "5px" }} />
        Login to your profile
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-wrapper">
          <AccountCircleIcon sx={{ marginRight: "5px" }} />
          <TextField
            id="username"
            label="Username"
            variant="standard"
            sx={{ width: 1 }}
            inputRef={nameRef}
          />
        </div>
        <div className="input-wrapper">
          <HttpsOutlinedIcon sx={{ marginRight: "5px" }} />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            sx={{ width: 1 }}
            type="password"
            inputRef={pasRef}
          />
        </div>
        <button type="submit" className="login-btn">
          Submit
        </button>
      </form>
      <CancelIcon
        className="login-cancel"
        onClick={() => setShowLogin(false)}
      />
    </div>
  );
};
export default Login;
