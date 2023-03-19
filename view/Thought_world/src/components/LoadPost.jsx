import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchUsers } from "../redux/registration/action.register";
import { CountPostLikes } from "./CountPostLikes";
import { LoadSaved } from "./LoadSaved";
import { AddComment, getComments } from "../redux/comments/action.comment";
import { PostHead } from "./postHead";

export const LoadPost = ({ userId, imageUrl, title, privatePost, id }) => {
  const [comment, setComment] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const { activeUser, users, comments } = useSelector((store) => {
    return {
      users: store.reducer.users,
      activeUser: store.Loginreducer.activeUser,
      comments: store.commentReducer.comments,
    };
  }, shallowEqual);
  //

  const typeComment = (e) => {
    setComment(e.target.value);
  };

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
    dispatch(fetchUsers);
    dispatch(getComments);
  }, [location.search]);

  return (
    <>
      {privatePost ? (
        ""
      ) : (
        <div className="card">
          {/* 
                    post head 
                */}
          <PostHead userId={userId} id={id} />
          {/*  */}
          <div className="content">
            <img src={imageUrl} width="120px" alt="" />
          </div>
          <div className="likes">
            <CountPostLikes postId={id} />
            {/*  */}
            <Link>
              <i className="fa fa-send-o"></i>
            </Link>
            {/*  */}
            <Link to={`/post/${id}`}>
              <i className="fa fa-comment-o"></i>
            </Link>
            <LoadSaved postId={id} />
          </div>
          <span>{title}</span>
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
      )}
    </>
  );
};
