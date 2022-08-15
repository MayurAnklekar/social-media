import React, { useState, useEffect } from "react";
import { dp, cakeIcon, mailIcon, cameraIcon } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./profilecard.css";
import { createChat } from "../../features/messageSlice";
import { setIsLoading } from "../../features/modalSlice";
import { logout } from "../../features/userSlice";
import { fetchUsersService, fetchFollowService } from "../../services/userServices";


const months = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

const ProfileCard = ({ profile_id, isOwnProfile }) => {
	const {
		user: id,
		users: { users },
	} = useSelector((state) => state);
	console.log("I am all users", users);
	const user = users.find((user) => user._id === profile_id);
	console.log("op", user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isUploading, setIsUploading] = useState(false);


	const [isFollowing, setIsFollowing] = useState(user.following.includes(profile_id));



	// let newDate = new Date(dob);
	// dob = `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`;

	const sendMessage = async () => {
		dispatch(setIsLoading(true));
		dispatch(createChat({ profile_id })).then(() => {
			if (window.innerWidth < 801) navigate("/chat/messenger");
			else navigate("/chat");
			dispatch(setIsLoading(false));
		});
	};

	const handleFollow = async () => {
		const data = await fetchFollowService({"id":id, "profile_id":profile_id})
		setIsFollowing(prev=>!prev);
	}

	return (
		<section className="profilecard gradient-border">
			<header>
				<div>
					<img
						src={user?.profileImage || dp}
						alt="profile_image"
						className="profilecard__dp roundimage"
					/>
					{isOwnProfile && (
						<div className="dp-upload">
							<img
								src={cameraIcon}
								alt="change_profile_image"
								onClick={() => setIsUploading(true)}
							/>
						</div>
					)}
				</div>
				<h1>{user?.name || "User"}</h1>
				<h2>{user?.about || "About"}</h2>
			</header>
			<article>
				<div className="profilecard__info">
					<img src={mailIcon} alt="mail" />
					<h3>{user?.email}</h3>
				</div>
				<div className="profilecard__info">
					<img src={cakeIcon} alt="date of birth" />
					<h3>Date of birth</h3>
				</div>
			</article>
			{isOwnProfile ? (
				<div className="btn-group">
					<button onClick={() => dispatch(logout())}>Logout</button>
				</div>
			) : (
				<div className="btn-group">
					<button onClick={sendMessage}>Message</button>
					<button onClick={handleFollow}>{isFollowing?(<>Following</>):(<>Follow</>)}</button>
				</div>
			)}
		</section>
	);
};

export default ProfileCard;
