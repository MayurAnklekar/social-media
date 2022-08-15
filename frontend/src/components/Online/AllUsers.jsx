import React from "react";
import { dp } from "../../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/modalSlice";
import "./allUsers.css";

const AllUsers = () => {
	const {
		users: { users },
	} = useSelector(state => state);

	const dispatch = useDispatch();

	const allUsers = () => {
		return users.map(user => (
			<Link to={`/user/${user._id}`} key={user._id} onClick={() => dispatch(toggleSidebar(false))}>
				<div className="user">
					<div>
						<img src={user.profileImage || dp} alt={user.name + " image"} className="roundimage" />
					</div>
					<h3>{user.name}</h3>
				</div>
			</Link>
		));
	};

	return (
		<section className="online">
			<h2>All Users - {users.length}</h2>
			{allUsers()}
		</section>
	);
};

export default AllUsers;
