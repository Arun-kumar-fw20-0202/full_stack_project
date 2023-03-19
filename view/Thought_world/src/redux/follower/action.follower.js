import axios from "axios";
import {
  FOLLOW_ERROR,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  GET_FOLLOWER,
  UN_FOLLOW,
} from "../actionType";

export const follow_request = () => {
  return { type: FOLLOW_REQUEST };
};
export const follow_success = (payload) => {
  return { type: FOLLOW_SUCCESS, payload };
};
export const follow_error = () => {
  return { type: FOLLOW_ERROR };
};

export const get_follower = (payload) => {
  return { type: GET_FOLLOWER, payload };
};
export const unfollow_success = (payload) => {
  return { type: UN_FOLLOW, payload };
};

export const followHandler = (followintData) => (dispatch) => {
  dispatch(follow_request);
  axios
    .post("http://localhost:8080/followers/add", followintData)
    .then((res) => {
      dispatch(follow_success(res.data));
    })
    .catch((err) => {
      dispatch(follow_error);
    });
};

export const LoadFollower = (dispatch) => {
  dispatch(follow_request);
  axios
    .get("http://localhost:8080/followers")
    .then((res) => {
      dispatch(get_follower(res.data));
    })
    .catch((err) => {
      dispatch(follow_error);
    });
};

export const UnfollowHandler = (id) => async (dispatch) => {
  dispatch(follow_request);
  try {
    const res = await fetch(`http://localhost:8080/followers/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
    dispatch(unfollow_success(id));
  } catch (e) {
    dispatch(follow_error);
  }
};
