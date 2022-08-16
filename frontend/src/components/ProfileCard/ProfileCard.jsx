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

const ProfileCard = ({ id, isOwnProfile }) => {
  const fileInputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    users: { users },
  } = useSelector((state) => state);
  console.log(users);
  const user = users.find((user) => user._id === id);
  console.log("op", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const compress = new Compress();

  // let newDate = new Date(dob);
  // dob = `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`;

  const sendMessage = async () => {
    dispatch(setIsLoading(true));
    dispatch(createChat({ id })).then(() => {
      if (window.innerWidth < 801) navigate("/chat/messenger");
      else navigate("/chat");
      dispatch(setIsLoading(false));
    });
  };
  function hideUploading() {
    setIsUploading(false);
  }

  // useEffect(() => {
  //   if (image) {
  //     const formData = new FormData();
  //     formData.append("image", image);
  //     console.log(image, "frm msg");
  //     var reader = new FileReader();
  //     reader.onload = function (e) {
  //       setPreview(reader.result);
  //     };
  //     input.files[0] && reader.readAsDataURL(input.files[0]);
  //     const files = [...input.files];
  //     compress
  //       .compress(files, {
  //         size: 0.5,
  //         quality: 0.75,
  //         maxWidth: 1000,
  //         maxHeight: 1000,
  //         resize: true,
  //         rotate: false,
  //       })
  //       .then((data) => {
  //         setImage(Compress.convertBase64ToFile(data[0]?.data, data[0]?.ext));
  //       });
  //   } else {
  //     setPreview(null);
  //   }
  // }, [image, dispatch]);

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
  return (
    <section className="profilecard gradient-border">
      {/* {isOwnProfile && (
        <>
          <Backdrop show={isUploading} onClose={hideUploading}>
            <ImageUpload close={hideUploading} />
          </Backdrop>
        </>
      )} */}
      <header>
        <form>
          <img
            // src={user?.preview || dp}
            src={user?.profileImage || dp}
            alt="profile_image"
            className="profilecard__dp roundimage "
          />
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
        </div>
      )}
    </section>
  );
};

export default ProfileCard;
