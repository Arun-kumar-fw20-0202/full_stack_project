import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/login.css";
import "font-awesome/css/font-awesome.min.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
// import { store } from "../store";
import {
  Authantication,
  Loginwithweb,
} from "../redux/loginReducer/action.login";
let userInput = {
  username: "",
  password: "",
};
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginData, setLogindata] = useState(userInput);
  const { username, password } = loginData;
  const { isAuth, activeUser, isLoading, isError } = useSelector((store) => {
    return {
      isAuth: store.Loginreducer.isAuth,
      activeUser: store.Loginreducer.activeUser,
      isLoading: store.reducer.isLoading,
      isError: store.reducer.isError,
    };
  });

  const handleChange = (e) => {
    setLogindata({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Loginwithweb(loginData));
  };

  const handleCallbackResponse = (response) => {
    let userObj = jwt_decode(response.credential);
    let newObj = {
      _id: userObj.sub,
      gmail: userObj.email,
      avatar: userObj.picture,
      name: userObj.name,
      name2: userObj.given_name,
    };
    dispatch(Authantication(newObj));
  };

  // console.log(location)

  useEffect(() => {
    if (isAuth && location.state) {
      navigate(location.state);
    } else if (isAuth && location.pathname == "/login") {
      navigate("/");
    }
    google.accounts.id.initialize({
      client_id:
        "620150314608-nngruoh1gbevp4kbv5vir2h3on0fdnar.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, [isAuth]);

  return (
    <>
      <div className="Lmain">
        <div className="box">
          <div className="imgBx">
            <img src="../../public/loginimg5.jpg" />
          </div>
          {/* <!--  --> */}
          <div className="box2">
            <h3>{isLoading ? "Loging...." : ""}</h3>
            <h3>
              {isError ? "Something went wrong Please try again later" : ""}
            </h3>
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className="inputBx">
                <input
                  required=""
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => handleChange(e)}
                />
                <span className="text">
                  {" "}
                  <i className="fa fa-user"></i> Name
                </span>
                <span className="line"></span>
              </div>
              <div className="inputBx">
                <input
                  required=""
                  type="Password"
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
                <span className="text">Password</span>
                <span className="line"></span>
              </div>
              <div className="inputBx">
                <input type="submit" name="login" value="Login" />
                OR <Link to={"/register"}>SignUp</Link>
                <br />
                <br />
                <div id="signInDiv"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
