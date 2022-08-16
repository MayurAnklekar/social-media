import React from "react";
import { dp } from "../../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/modalSlice";
import "./allUsers.css";

const AllUsers = () => {
	const {
		user: {id},
		users: { users },
	} = useSelector(state => state);

	const user = users.find((user) => user?._id === id);

	const dispatch = useDispatch();

	const Following = () => {
		console.log("Its me yaar",user?.following)
		const followings = user?.following?.map(following=>{

			const followingDetails = users.find((user) => user?._id === following);
			console.log("ay watan",following)
			return followingDetails;
		})
		console.log("followings",followings)
		return followings?.map(user => (
			
			<Link to={`/user/${user?._id}`} key={user?._id} onClick={() => dispatch(toggleSidebar(false))}>
				<div className="user">
					<div>
						<img src={user?.profileImage || dp} alt={user?.name + " image"} className="roundimage" />
					</div>
					<h3>{user?.name}</h3>
				</div>
			</Link>
		));
	};

	const Followers = () => {
		console.log("Its me yaar",user)
		const followers = user?.followers?.map(follower=>{
			const followerDetails = users.find((user) => user?._id === follower);
			return followerDetails;
		})
		return followers?.map(user => (
			
			<Link to={`/user/${user?._id}`} key={user?._id} onClick={() => dispatch(toggleSidebar(false))}>
				<div className="user">
					<div>
						<img src={user?.profileImage || dp} alt={user?.name + " image"} className="roundimage" />
					</div>
					<h3>{user?.name}</h3>
				</div>
			</Link>
		));
	};

	const NewUsers = () => {
		console.log("Its me yaar",user)
		const newUsers = [...users]?.reverse().filter(user=>{
			return user?._id !== id;
		})
		if(newUsers.length>5)
		{
			newUsers.length=5
		}
		return newUsers?.map(user => (
			
			<Link to={`/user/${user?._id}`} key={user?._id} onClick={() => dispatch(toggleSidebar(false))}>
				<div className="user">
					<div>
						<img src={user?.profileImage || dp} alt={user?.name + " image"} className="roundimage" />
					</div>
					<h3>{user?.name}</h3>
				</div>
			</Link>
		));
	};

	return (
		<section className="online">
			<h2>Followers - {user?.followers.length}</h2>
			{Followers()}
			<h2>Following - {user?.following.length}</h2>
			{Following()}
			<h2>New Users - {users.length>=5?(<>5</>):(<>{users.length}</>)}</h2>
			{NewUsers()}
		</section>
	);
};

export default AllUsers;
