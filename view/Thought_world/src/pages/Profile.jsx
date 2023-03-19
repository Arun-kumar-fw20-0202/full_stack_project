import React, { useState } from "react";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LoadUserPost } from "../components/LoadUserPost";
import { handleGetPost } from "../redux/addPostReducer/action.addPost";
import {
  LoadFollower,
  UnfollowHandler,
} from "../redux/follower/action.follower";
import { fetchUsers } from "../redux/registration/action.register";
import "../styles/profile.css";

export const Profile = () => {
  const dispatch = useDispatch();
  const [whatTOshow, setWhatToshow] = useState("");
  const [shodHide, setShodHide] = useState(false);
  const { isAuth, activeUser, posts, follower, user } = useSelector((store) => {
    return {
      activeUser: store.Loginreducer.activeUser,
      user: store.reducer.users,
      isAuth: store.Loginreducer.isAuth,
      posts: store.AddPostreducer.posts,
      follower: store.FollowerReducer.follower,
    };
  }, shallowEqual);

  const handleShowFollowers = () => {
    setWhatToshow("followrs");
    setShodHide(true);
  };
  const handleShowFollowing = () => {
    setWhatToshow("following");
    setShodHide(true);
  };
  const closePopup = () => {
    setShodHide(false);
    setWhatToshow("");
  };

  // Get following & followers
  let count_followers = 0;
  let count_following = 0;
  let check = false;
  let followId = null;
  user.map((ele) => {
    //get followers
    follower.map((el) => {
      ele._id == el.followingId && el.myId == activeUser._id
        ? count_following++
        : "";
      ele._id == el.myId && activeUser._id == el.followingId
        ? count_followers++
        : "";
    });
  });

  // Get Total post
  let total_posts = 0;
  posts.map((ele) => {
    ele.userId == activeUser._id ? total_posts++ : "";
  });

  const unfollow_user = (unFollowId) => {
    // alert(unFollowId)
    dispatch(UnfollowHandler(unFollowId));
  };

  // fetching data
  useEffect(() => {
    dispatch(handleGetPost);
    dispatch(LoadFollower);
    dispatch(fetchUsers);
  }, []);

  // console.log(activeUser)

  return (
    <>
      {shodHide ? (
        <div className="followersPopup">
          {/*  */}
          {whatTOshow && whatTOshow == "following" ? (
            <div className="popup">
              <button onClick={closePopup}>
                <i className="fa fa-close"></i>
              </button>
              <h1>Following</h1>
              <div className="list">
                {user.map((ele, i) =>
                  follower.map((el) =>
                    ele._id == el.followingId && el.myId == activeUser._id ? (
                      <div key={i} className="userItem">
                        <span>
                          {/* <img src={ele.avatar} alt="" /> */}
                          <img
                            src={
                              ele.avatar == ""
                                ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                                : ele.avatar
                            }
                            alt=""
                          />
                          <h2>{ele.name}</h2>
                        </span>
                        <button onClick={() => unfollow_user(el._id)}>
                          Unfollow
                        </button>
                      </div>
                    ) : (
                      ""
                    )
                  )
                )}
              </div>
            </div>
          ) : (
            // {/*  */}
            <div className="popup">
              <button onClick={closePopup}>
                <i className="fa fa-close"></i>
              </button>
              <h1>Followrs</h1>
              <div className="list">
                {user.map((ele, i) =>
                  follower.map((el) =>
                    ele._id == el.myId && activeUser._id == el.followingId ? (
                      <div key={i} className="userItem">
                        <span>
                          <img
                            src={
                              ele.avatar == ""
                                ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                                : ele.avatar
                            }
                            alt=""
                          />
                          <h2>{ele.name}</h2>
                        </span>
                        <button>Remove</button>
                      </div>
                    ) : (
                      ""
                    )
                  )
                )}
              </div>
            </div>
          )}
          {/*  */}
        </div>
      ) : (
        ""
      )}
      {/*  */}
      <div className="profile_main">
        <div className="P_top">
          <div className="avatar">
            <img
              src={
                activeUser.avatar == ""
                  ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                  : activeUser.avatar
              }
              alt=""
            />
          </div>
          <div className="data">
            <div className="names">
              <h3>
                {activeUser.name}

                <button>Edit profile</button>
              </h3>
              <p>{activeUser.given_name || activeUser.gmail}</p>
            </div>
            <br />
            <div className="totla">
              <h3>Posts: {total_posts}</h3>
              <h3 onClick={handleShowFollowers}>
                Followers: {count_followers}
              </h3>
              <h3 onClick={handleShowFollowing}>
                Following: {count_following}
              </h3>
            </div>
          </div>
        </div>
        <div className="My_posts">
          {posts &&
            posts.map((ele, i) =>
              ele.userId == activeUser._id ? (
                <LoadUserPost key={i} {...ele} />
              ) : (
                ""
              )
            )}
        </div>
      </div>
    </>
  );
};
