import axios from "axios";
import {
  LOGIN_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
} from "../actionType";

export const loginUserRequest = () => {
  return { type: LOGIN_USER_REQUEST };
};
export const loginUserSuccess = (payload) => {
  return { type: LOGIN_USER_SUCCESS, payload };
};
export const loginUserError = () => {
  return { type: LOGIN_USER_ERROR };
};

export const GoogleLogoutRequest = () => {
  return { type: LOGOUT_USER_REQUEST };
};
export const GoogleLogoutSuccess = () => {
  return { type: LOGOUT_USER_SUCCESS };
};
export const GoogleLogoutError = () => {
  return { type: LOGOUT_USER_ERROR };
};

//

export const Loginwithweb = (loginData) => (dispatch) => {
  dispatch(loginUserRequest);
  // console.log(loginData)
  axios
    .get(`http://localhost:8080/users`)
    .then((res) => {
      res.data.map((ele) => {
        if (
          ele.gmail == loginData.username &&
          ele.password == loginData.password
        ) {
          dispatch(loginUserSuccess(ele));
          localStorage.setItem("userData", JSON.stringify(ele));
          localStorage.setItem("isAuth", JSON.stringify(true));
          return;
        }
      });
    })
    .catch((err) => {
      dispatch(loginUserError);
    });
};

//
export const Authantication = (userData) => (dispatch) => {
  dispatch(loginUserRequest);
  axios
    .get("http://localhost:8080/users")
    .then((res) => {
      if (res.data.length <= 0) {
        axios
          .post("http://localhost:8080/users/add", userData)
          .then((res) => {
            console.log("part 2");
            dispatch(loginUserSuccess(res.data));
            localStorage.setItem("userData", JSON.stringify(res.data));
            localStorage.setItem("isAuth", JSON.stringify(true));
          })
          .catch((err) => {
            dispatch(loginUserError);
          });
      } else {
        res.data.map((el) => {
          if (el._id == userData.id) {
            console.log("part one");
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("isAuth", JSON.stringify(true));
            dispatch(loginUserSuccess(userData));
          } else {
            axios
              .post("http://localhost:8080/users/add", userData)
              .then((res) => {
                console.log("part 2");
                dispatch(loginUserSuccess(res.data));
                localStorage.setItem("userData", JSON.stringify(res.data));
                localStorage.setItem("isAuth", JSON.stringify(true));
              })
              .catch((err) => {
                dispatch(loginUserError);
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("isAuth", JSON.stringify(true));
};

export const AuthLogout = () => (dispatch) => {
  dispatch(GoogleLogoutRequest());

  localStorage.setItem("userData", JSON.stringify({}));
  localStorage.setItem("isAuth", JSON.stringify(false));
  dispatch(GoogleLogoutSuccess());
};
