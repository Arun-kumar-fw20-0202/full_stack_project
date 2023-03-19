import axios from "axios";
import { GET_SAVE_POST, REMOVE_SAVE_POST, SAVE_POST } from "../actionType";

export const getSaves = (payload) => {
  return { type: GET_SAVE_POST, payload };
};
export const handleSavePost = (payload) => {
  return { type: SAVE_POST, payload };
};
export const handleRemoveSave = (payload) => {
  return { type: REMOVE_SAVE_POST, payload };
};

//

export const LoadSaves = (dispatch) => {
  axios
    .get("http://localhost:8080/saved")
    .then((res) => {
      dispatch(getSaves(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const AddToSave = (data) => (dispatch) => {
  axios
    .post("http://localhost:8080/saved/add", data)
    .then((res) => {
      dispatch(handleSavePost(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const RemoveSaves = (id) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:8080/saved/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    dispatch(handleRemoveSave(id));
  } catch (e) {
    console.log(e);
  }
};
