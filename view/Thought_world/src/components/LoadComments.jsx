import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUsers } from "../redux/registration/action.register";

export const LoadComments = ({
  comenteterId,
  comment,
  deleteStatus,
  id,
  postId,
  time,
}) => {
  const dispatch = useDispatch();

  const { users } = useSelector((store) => {
    return {
      users: store.reducer.users,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(fetchUsers);
  }, [location.search]);

  return (
    <>
      <div className="text">
        {users.map((ele, i) =>
          ele._id == comenteterId ? (
            <div key={i} className="avatar">
              <Link to={`/user/${comenteterId}`}>
                <img
                  src={
                    ele.avatar == ""
                      ? "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                      : ele.avatar
                  }
                  alt=""
                />
                <h5>{ele.name2}</h5>
              </Link>
            </div>
          ) : (
            ""
          )
        )}
        <p>{comment}</p>
      </div>
    </>
  );
};
