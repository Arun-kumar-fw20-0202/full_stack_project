import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { handleDeletePost } from "../redux/addPostReducer/action.addPost";
import {
  fetchSingleUser,
  fetchUsers,
} from "../redux/registration/action.register";
import $ from "jquery";
import {
  followHandler,
  LoadFollower,
  UnfollowHandler,
} from "../redux/follower/action.follower";

export const PostHead = ({ userId, id }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(userId)
  const { isAuth, activeUser, users, follower } = useSelector((store) => {
    return {
      users: store.reducer.users,
      activeUser: store.Loginreducer.activeUser,
      follower: store.FollowerReducer.follower,
      isAuth: store.Loginreducer.isAuth,
    };
  }, shallowEqual);

  $(document).on("click", ".option", function () {
    $(".option").removeClass("active");
    $(this).toggleClass("active");
  });
  // console.log(isAuth)

  const follow_user = () => {
    let obj = {
      followingId: userId,
      myId: activeUser._id,
      date: Date.now(),
    };
    dispatch(followHandler(obj));
  };
  const unfollow_user = (unFollowId) => {
    // alert(unFollowId)
    dispatch(UnfollowHandler(unFollowId));
  };

  const DeletePost = () => {
    dispatch(handleDeletePost(id));
  };

  // check if the usre is following or not
  let check = false;
  let followId = null;
  follower.map((ele) => {
    ele.followingId == userId && ele.myId == activeUser._id
      ? (check = true)
      : "";
    ele.followingId == userId ? (followId = ele._id) : "";
  });

  // fetching data
  useEffect(() => {
    dispatch(fetchUsers);
    dispatch(LoadFollower);
  }, [location.search]);

  return (
    <>
      <div className="head">
        {users.map((ele, i) =>
          userId == ele._id ? (
            <span className="headSpan" key={i}>
              <Link
                to={ele._id == activeUser._id ? "/profile" : `/user/${ele._id}`}
              >
                <img
                  src={
                    userId == ele._id
                      ? ele.avatar == ""
                        ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                        : ele.avatar
                      : ""
                  }
                  alt=""
                />
              </Link>
              <span className="username">
                <Link
                  to={
                    ele._id == activeUser._id ? "/profile" : `/user/${ele._id}`
                  }
                >
                  {userId == ele._id ? ele.name : ""}
                </Link>{" "}
                {/* <span key={ele._id}> */}
                {
                  ele._id != activeUser._id ? (
                    isAuth ? (
                      check ? (
                        <button onClick={() => unfollow_user(followId)}>
                          Unfollow
                        </button>
                      ) : (
                        <button onClick={follow_user}>Follow</button>
                      )
                    ) : (
                      // if not logedin
                      <button>Follow</button>
                    )
                  ) : (
                    ""
                  ) // hide button from own
                }
                {/* </span> */}
              </span>
            </span>
          ) : (
            ""
          )
        )}
        <span className="option">
          {" "}
          <b>...</b>
        </span>
        <div className="more">
          {userId == activeUser._id ? (
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
    </>
  );
};
