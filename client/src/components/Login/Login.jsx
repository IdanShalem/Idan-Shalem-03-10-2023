import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import { MessagingContext } from "../../state/Messaging/Messaging";
import { UserContext } from "../../state/User/User";

const Login = () => {
  const fetchUser = axios.create({
    baseURL: "http://localhost:5000/user"
  });

  const { showSnackBar, SnackbarTypes } = useContext(MessagingContext);
  const { verifyUser } = useContext(UserContext);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleChange = event => setUserId(event.target.value);

  const handleClick = () => {
    fetchUser.get(`/${userId}`)
      .then(res => {
        const isVerified = verifyUser(res?.data?.userId, res?.data?.AUTH_TOKEN);
        if(isVerified) {
          showSnackBar("User Verified", SnackbarTypes.SUCCESS_MESSAGE);
          navigate(`/`);
        };
      })
      .catch(err => showSnackBar(err?.response?.data, SnackbarTypes.SUCCESS_MESSAGE));
  };

  return (
    <div id="form-wrapper">
      <p id="login-title">Please Login</p>
        <label htmlFor="user-id-input">User ID:</label>
        <input id="user-id-input" name="userId" type="text" value={userId} onChange={handleChange} />
      <button id="submit-button" onClick={handleClick}>SUBMIT</button>
    </div>
  )
};

export default Login;