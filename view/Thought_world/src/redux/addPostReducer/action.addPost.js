import axios from "axios";
import {
  ADD_POST_ERROR,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POST,
  GET_POST_ERROR,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_SINGLE_POST_SUCCESS,
} from "../actionType";

export const addPostRequest = () => {
  return { type: ADD_POST_REQUEST };
};

export const addPostSuccess = (payload) => {
  return { type: ADD_POST_SUCCESS, payload };
};

export const addPostError = () => {
  return { type: ADD_POST_ERROR };
};

export const getPostRequest = () => {
  return { type: GET_POST_REQUEST };
};
export const getPostSuccess = (payload) => {
  return { type: GET_POST_SUCCESS, payload };
};
export const getPostError = () => {
  return { type: GET_POST_ERROR };
};

export const getSinglePost = (payload) => {
  return { type: GET_SINGLE_POST_SUCCESS, payload };
};

export const deletePostSuccess = (payload) => {
  return { type: DELETE_POST, payload };
};

//

export const SinglePostHandler = (id) => (dispatch) => {
  dispatch(getPostRequest);
  axios
    .get(`http://localhost:8080/posts/${id}`)
    .then((res) => {
      dispatch(getSinglePost(res.data));
    })
    .catch((err) => {
      getPostError();
    });
};

export const handleAddPost = (data) => (dispatch) => {
  dispatch(addPostRequest());
  axios
    .post("http://localhost:8080/posts/add", data)
    .then((res) => {
      dispatch(addPostSuccess(res.data));
    })
    .catch((err) => {
      dispatch(addPostError());
    });
};

export const handleGetPost = (dispatch) => {
  dispatch(getPostRequest);
  axios
    .get("http://localhost:8080/posts")
    .then((res) => {
      dispatch(getPostSuccess(res.data));
    })
    .catch((err) => {
      getPostError();
    });
};

export const handleDeletePost = (id) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:8080/posts/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
    dispatch(deletePostSuccess(id));
  } catch (err) {
    console.log(err);
  }
};
