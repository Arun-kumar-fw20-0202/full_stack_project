import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAddPost } from "../redux/addPostReducer/action.addPost";
import "../styles/addpost.css";

const addData = {
  title: "",
  imageUrl: "",
  privatePost: false,
};
export const AddPost = () => {
  const [state, setState] = useState(addData);
  const { title, imageUrl, privatePost } = state;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { isLoading, isError, activeUser } = useSelector((store) => {
    return {
      activeUser: store.Loginreducer.activeUser,
      isLoading: store.AddPostreducer.isLoading,
      isError: store.AddPostreducer.isError,
    };
  });

  const handleChange = (e) => {
    let val = e.target.type == "checkbox" ? e.target.checked : e.target.value;
    setState({ ...state, [e.target.name]: val });
  };

  let image_url;
  const handleAvatar = async (e) => {
    setLoading(true);
    try {
      let image = document.querySelector("#image");
      let actual_image = image.files[0];

      let form = new FormData();
      form.append("image", actual_image);

      let res = await fetch(
        `https://api.imgbb.com/1/upload?key=f8c6dae46c1e3a6c267aa2ea5d96aacd`,
        {
          method: "POST",
          body: form,
        }
      );

      let data = await res.json();
      image_url = data.data.display_url;
      setState({ ...state, [e.target.name]: image_url });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newObj = {
      userId: activeUser._id,
      title,
      imageUrl,
      privatePost: privatePost,
    };
    dispatch(handleAddPost(newObj));
    setState(addData);
  };

  return (
    <div className="M_add">
      <div className="box">
        {isLoading ? <h3>Adding post...</h3> : ""}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputBx">
            <span>Title</span>
            <input
              value={title}
              type="text"
              name="title"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inputBx">
            <span>Image</span>
            <input
              type="file"
              id="image"
              name="imageUrl"
              onChange={handleAvatar}
            />
          </div>

          <div className="inputBx">
            <span>Make Post Private </span>
            <input
              value={privatePost}
              name="privatePost"
              type="checkbox"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="inputBx">
            {loading ? <b>please wait...</b> : ""}
            <button disabled={loading}>Add Post +</button>
          </div>
        </form>
      </div>
    </div>
  );
};
