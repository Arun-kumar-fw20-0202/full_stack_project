import axios from "axios";
import { GET_LIKES, GIVE_LIKE, REMOVE_LIKES } from "../actionType";

export const getLikes = (payload) => {
  return { type: GET_LIKES, payload };
};
export const handleAddLike = (payload) => {
  return { type: GIVE_LIKE, payload };
};
export const handleRemoveLike = (payload) => {
  return { type: REMOVE_LIKES, payload };
};

export const addLike = (data) => (dispatch) => {
  axios
    .post("http://localhost:8080/likes/add", data)
    .then((res) => {
      dispatch(handleAddLike(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const LoadLikes = (dispatch) => {
  axios
    .get("http://localhost:8080/likes")
    .then((res) => {
      dispatch(getLikes(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const DeleteLike = (id) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:8080/likes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
    dispatch(handleRemoveLike(id));
  } catch (e) {
    console.log(e);
  }
};
