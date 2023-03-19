import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, DeleteLike, LoadLikes } from "../redux/likes/action.like";

export const CountPostLikes = ({ postId }) => {
  const dispatch = useDispatch();
  const { likes, isAuth, activeUser } = useSelector((store) => {
    return {
      likes: store.LikeReducer.likes,
      isAuth: store.Loginreducer.isAuth,
      activeUser: store.Loginreducer.activeUser,
    };
  }, shallowEqual);

  let check_liked = false;
  let totalLikes = 0;
  likes &&
    likes.map((ele) => {
      ele.postId == postId && ele.likedUserId == activeUser._id
        ? (check_liked = true)
        : "";
      ele.postId == postId ? totalLikes++ : 0;
    });

  const manageLike = (e) => {
    e.preventDefault();
    let userObj = {
      likedUserId: activeUser._id,
      postId: postId,
      hitLike: true,
    };
    dispatch(addLike(userObj));
  };

  const removeLike = (e) => {
    e.preventDefault();
    // console.log(id)
    likes &&
      likes.map((ele) => {
        if (ele.postId == postId && ele.likedUserId == activeUser._id) {
          console.log(ele._id);
          dispatch(DeleteLike(ele._id));
        }
      });
  };

  useEffect(() => {
    // setTimeout(function () {
    dispatch(LoadLikes);
    // });
  }, []);

  return (
    <>
      {isAuth ? (
        check_liked ? (
          <Link style={{ color: "red" }} onClick={(e) => removeLike(e)}>
            <i className="fa fa-heart"></i>
            <br />
            <span style={{ fontSize: "15px" }}>
              {/* <small>Likes</small> */}
              {totalLikes}
            </span>
          </Link>
        ) : (
          <Link onClick={(e) => manageLike(e)}>
            <i className="fa fa-heart-o"></i>
            <br />
            <span style={{ fontSize: "15px" }}>
              {/* <small>Likes</small> */}
              {totalLikes}
            </span>
          </Link>
        )
      ) : (
        <Link to="/login">
          <i className="fa fa-heart-o"></i>
          <br />
          <span style={{ fontSize: "15px" }}>
            {/* <small>Likes</small> */}
            {totalLikes}
          </span>
        </Link>
      )}
    </>
  );
};
