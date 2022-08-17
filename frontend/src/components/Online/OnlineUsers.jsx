import React from "react";
import { dp } from "../../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/modalSlice";
import "./onlineUsers.css";

function OnlineUsers() {
  const {
    users: { users, usersOnline },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  function online() {
    const _onUsers = users.filter((user) =>
      usersOnline.some((u) => u.id === user._id)
    );

    return _onUsers.map((user) => (
      <Link
        to={`/user/${user._id}`}
        key={user._id}
        onClick={dispatch(toggleSidebar(false))}
      >
        <div className="user" title={user.name}>
          <div className="green">
            <img
              src={user.profileImage || dp}
              alt={user.name + " image"}
              className="roundimage"
            />
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <section className="online">
      <h2>Online users - {usersOnline.length}</h2>
      <div className="onine-users">{online}</div>
    </section>
  );
}

export default OnlineUsers;
