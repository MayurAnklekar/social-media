import React, { useEffect, useRef, useState } from "react";
import { dp, cakeIcon, mailIcon, cameraIcon } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./profilecard.css";
import { createChat } from "../../features/messageSlice";
import { setIsLoading } from "../../features/modalSlice";
import { logout } from "../../features/userSlice";
import ImageUpload from "../ImageUpload/ImageUpload";
import Backdrop from "../Backdrop/Backdrop";
import { updateDPService } from "../../services/userServices";
import { update } from "../../features/userSlice";
import Compress from "compress.js";
import { getUsers } from "../../features/usersSlice";
import {
  fetchUsersService,
  fetchFollowService,
} from "../../services/userServices";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ProfileCard = ({ profile_id, isOwnProfile }) => {
  const fileInputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    user: id,
    users: { users },
  } = useSelector((state) => state);
  const user = users.find((user) => user._id === profile_id);
  const me = users.find((user) => user._id === id.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const compress = new Compress();
  console.log(me?.following.includes(profile_id), "yeh mera id hai");
  const [isFollowing, setIsFollowing] = useState(false);
  console.log(isFollowing, "isFollowing");

  useEffect(() => {
    if (me?.following.includes(profile_id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [me, profile_id]);

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
  function hideUploading() {
    setIsUploading(false);
  }

  function buttonHandler(event) {
    event.preventDefault();
    fileInputRef.current.click();
  }
  useEffect(() => {
    const submitHandler = async () => {
      const formData = new FormData();
      formData.append("image", image);
      console.log(image, "submit");
      const data = await updateDPService(formData);

      console.log(data);
      if (data) {
        dispatch(
          update({ profileImage: data.user.profileImage, id: data.user._id })
        );

        setImage(null);
        setPreview(null);
        dispatch(getUsers());
      }
    };
    submitHandler();
  }, [image, dispatch]);

  function inputHandler(event) {
    const input = event.target;

    if (!input) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      setPreview(e.target.result);
    };
    input.files[0] && reader.readAsDataURL(input.files[0]);
    const files = [...input.files];
    console.log(files, "input this is");
    compress
      .compress(files, {
        size: 0.5,
        quality: 0.75,
        maxWidth: 1000,
        maxHeight: 1000,
        resize: true,
        rotate: false,
      })
      .then((data) => {
        console.log(
          Compress.convertBase64ToFile(data[0]?.data, data[0]?.ext),
          "compress"
        );
        setImage(Compress.convertBase64ToFile(data[0]?.data, data[0]?.ext));
      });
  }
  const handleFollow = async () => {
    setIsFollowing((prev) => !prev);
    await fetchFollowService({ id: id, profile_id: profile_id });
  };

  return (
    <section className="profilecard gradient-border">
      <header>
        <form>
          <div className="flex justify-center content-center">
            <img
              // src={user?.preview || dp}
              src={user?.profileImage || dp}
              alt="profile_image"
              className="profilecard__dp roundimage "
            />
          </div>
          {isOwnProfile && (
            <div className="dp-upload">
              {/* <button onClick={buttonHandler}></button> */}
              <img
                src={cameraIcon}
                alt="change_profile_image"
                onClick={buttonHandler}
              />

              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={inputHandler}
              />
            </div>
          )}
        </form>
        <h1>{user?.name || "User"}</h1>
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
          <button
            className="font-semibold bg-slate-600"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="btn-group">
          <button className="font-semibold bg-slate-600" onClick={sendMessage}>
            Message
          </button>
          <button
            className={`font-semibold ${
              isFollowing ? "bg-blue-600" : "bg-slate-600"
            }`}
            onClick={handleFollow}
          >
            {isFollowing ? <>Following</> : <>Follow</>}
          </button>
        </div>
      )}
    </section>
  );
};

export default ProfileCard;
