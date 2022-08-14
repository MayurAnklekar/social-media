import React from "react";
import InfinityScroll from "../../components/InfinityScroll/InfinityScroll";
import CreatePost from "../../components/CreatePost/CreatePost";
import Posts from "../../components/Post/Posts";
import { useSelector } from "react-redux";

const Home = () => {
  // const {
  //   post: {
  //     allPosts: { posts, page },
  //   },
  //   user: { id },
  // } = useSelector((state) => state);

  return (
    <div className="text-white flex flex-row justify-between">
      <div className="bg-gray-500 h-[25em] w-[19em]">Profile Card</div>
      <InfinityScroll>
        <main className="flex flex-col bg-slate-500 min-w-[20em] w-full">
          {/* <CreatePost /> */}
          <Posts />
        </main>
      </InfinityScroll>
      <div className="bg-slate-400 w-[22em]"></div>
    </div>
  );
};

export default Home;
