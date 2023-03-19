import axios from "axios";
import {
  ADD_COMMENT,
  ADD_USER_ERROR,
  ADD_USER_REQUEST,
  GET_COMMENT,
} from "../actionType";

export const AddCommentSuccessfuly = (payload) => {
  return { type: ADD_COMMENT, payload };
};
export const getCommentSuccessfuly = (payload) => {
  return { type: GET_COMMENT, payload };
};

export const getComments = (dispatch) => {
  dispatch({ type: ADD_USER_REQUEST });
  axios
    .get("http://localhost:8080/comments")
    .then((res) => {
      dispatch(getCommentSuccessfuly(res.data));
    })
    .catch((err) => {
      dispatch({ type: ADD_USER_ERROR });
    });
};
export const AddComment = (commentData) => (dispatch) => {
  dispatch({ type: ADD_USER_REQUEST });
  axios
    .post(`http://localhost:8080/comments/add`, commentData)
    .then((res) => {
      dispatch(AddCommentSuccessfuly(res.data));
    })
    .catch((err) => {
      dispatch({ type: ADD_USER_ERROR });
    });
};
