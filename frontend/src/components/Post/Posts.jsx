import React from "react";
import Post from "../../components/Post/Post";
import "./post.css";

function Posts({ posts }) {
  console.log(posts);
  return (
    <div className="posts">
      {posts.map((post, i) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}

export default Posts;
