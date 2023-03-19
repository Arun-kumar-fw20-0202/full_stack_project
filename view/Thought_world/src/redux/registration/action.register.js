import axios from "axios";
import {
  ADD_USER_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_PROFILE,
} from "../actionType";

export const addUserRequest = () => {
  return { type: ADD_USER_REQUEST };
};

export const addUserSuccess = (payload) => {
  return { type: ADD_USER_SUCCESS, payload };
};
export const addUserError = () => {
  return { type: ADD_USER_ERROR };
};

export const getUserReq = () => {
  return { type: GET_USERS_REQUEST };
};
export const getUserSuc = (payload) => {
  return { type: GET_USERS_SUCCESS, payload };
};
export const getUserErr = () => {
  return { type: GET_USERS_ERROR };
};

export const getSingleUser = (payload) => {
  return { type: GET_PROFILE, payload };
};

export const userRegistration = (userData) => (dispatch) => {
  dispatch(addUserRequest());
  console.log(userData);
  axios
    .post("http://localhost:8080/users/add", userData)
    .then((res) => {
      dispatch(addUserSuccess(res.data));
    })
    .catch((err) => {
      dispatch(addUserError());
    });
};

export const fetchUsers = (dispatch) => {
  dispatch(getUserReq);
  axios
    .get("http://localhost:8080/users")
    .then((res) => {
      dispatch(getUserSuc(res.data));
    })
    .catch((err) => {
      dispatch(getUserReq);
    });
};
//
export const fetchSingleUser = (id) => (dispatch) => {
  dispatch(getUserReq);
  axios
    .get(`http://localhost:8080/users/${id}`)
    .then((res) => {
      dispatch(getSingleUser(res.data));
    })
    .catch((err) => {
      dispatch(getUserReq);
    });
};
