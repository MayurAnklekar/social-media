import React from "react";
import Post from "../../components/Post/Post";

function Posts({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      {/* <Post /> */}
    </div>
  );
}

export default Posts;
