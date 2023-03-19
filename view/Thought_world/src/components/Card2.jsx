import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import $ from "jquery";
import { AddComment, getComments } from "../redux/comments/action.comment";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LoadComments } from "./LoadComments";

export const Card2 = ({ activeUser, singlePost, users, DeletePost }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const typeComment = (e) => {
    setComment(e.target.value);
  };

  const { id } = useParams("id");

  const { comments } = useSelector((store) => {
    return {
      comments: store.commentReducer.comments,
    };
  }, shallowEqual);

  const handleAddComment = (e) => {
    e.preventDefault();
    let commentObj = {
      postId: id,
      comment,
      comenteterId: activeUser._id,
      deleteStatus: false,
      time: Date.now(),
    };
    if (comment != "") {
      dispatch(AddComment(commentObj));
    }
    setComment("");
  };

  useEffect(() => {
    dispatch(getComments);
  }, [location.search]);

  return (
    <div className="card">
      <div className="head">
        {users.map((ele, i) => (
          <span key={i}>
            <Link to={`/user/${ele._id}`}>
              <img
                src={
                  singlePost.userId == ele._id
                    ? ele.avatar == ""
                      ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                      : ele.avatar
                    : ""
                }
                alt=""
              />
              <span className="username">
                {singlePost.userId == ele._id ? ele.name : ""}
              </span>
            </Link>
          </span>
        ))}
        <span className="option">
          {" "}
          <b>...</b>
        </span>
        <div className="more">
          {singlePost.userId == activeUser._id ? (
            <>
              <Link onClick={DeletePost}>Delete</Link>
              <Link>Edit</Link>
              <Link>Make Private</Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="comments">
        {comments.map((ele, i) =>
          ele.postId == id ? <LoadComments key={i} {...ele} /> : ""
        )}
      </div>
      <div className="comment">
        <form onSubmit={(e) => handleAddComment(e)}>
          <input
            placeholder="comment..."
            type="text"
            value={comment}
            onChange={(e) => typeComment(e)}
          />
          <button>send</button>
        </form>
      </div>
    </div>
  );
};
