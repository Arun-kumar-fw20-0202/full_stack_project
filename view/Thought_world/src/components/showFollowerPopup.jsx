import React from "react";

export const ShowFollowerPopup = ({
  unfollow_user,
  check,
  followId,
  whatTOshow,
  closePopup,
  user,
  follower,
  activeUser,
}) => {
  return (
    <>
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
    </>
  );
};
