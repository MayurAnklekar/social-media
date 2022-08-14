import React from "react";
import { Link } from "react-router-dom";

function Post() {
  function postDetails() {
    return (
      <img
        src={require("../../components/images/camera.jpeg")}
        alt="img"
        className="max-h-[60vh] w-full object-contain "
      />
    );
  }
  return (
    <div>
      <header className="flex flex-row p-4">
        <Link to="">
          <p className="bg-slate-200 rounded-full h-10 w-10"></p>
        </Link>
        <div>
          <h3 className="px-3">Name</h3>
          <p className="px-3 text-gray-300 text-xs">08\03\2022</p>
        </div>
      </header>
      <div className="flex justify-center content-center ">
        <div className="bg-gray-800 w-[98%]  flex">{postDetails()}</div>
      </div>

      <div>
        {/* <div className="post__reactions">
          <img
            src={
              isLiked
                ? require("../../assets/like-outline.svg")
                : require("../../assets/like.svg")
            }
            alt="like"
            onClick={likeHandler}
          />
          <p>{getNumberOfLikes() || ""}</p>
        </div> */}
      </div>
    </div>
  );
}

export default Post;
