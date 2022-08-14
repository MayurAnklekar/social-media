import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, commentPost, likePost } from "../../features/postSlice";

function Post({ post }) {
  const dispatch = useDispatch();
  const {
    user: { id },
    users: { usersOnline },
  } = useSelector((state) => state);
  const isOwnPost = id === post.createdBy;
  const isLiked = post.likes?.includes(id);
  const isOnline = usersOnline.some((user) => user.id === post.createdBy);

  const likeHandler = () => {
    dispatch(likePost({ id: post._id, isLiked }));
  };

  const commentHandler = (comment) => {
    dispatch(commentPost({ id: post._id, comment }));
  };

  const deleteHandler = () => {
    dispatch(deletePost({ id: post._id }));
  };

  //   const editHandler = () => {
  //     dispatch(setEditingPost(post));
  //   };

  const getNumberOfLikes = () => {
    if (post.likes?.length) {
      return post.likes?.includes(id)
        ? post.likes?.length - 1 === 0
          ? "You"
          : post.likes?.length - 1 === 1
          ? "You and 1 more"
          : `You and ${post.likes.length - 1} others`
        : post.likes?.length;
    }
    return false;
  };
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
    <div className="w-full max-h-[50em] min-w-[20em] flex flex-col">
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
        <div className="bg-gray-800   flex">{postDetails()}</div>
      </div>

      <div>
        <div className="post__reactions">
          <img
            src={
              isLiked
                ? require("../../assets/like-outlined.svg")
                : require("../../assets/like.svg")
            }
            alt="like"
            onClick={likeHandler}
          />
          <p>{getNumberOfLikes() || ""}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
