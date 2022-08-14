import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InfinityScroll from "../../components/InfinityScroll/InfinityScroll";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { fetchPostsService } from "../../services/postServices";
import { setAllPosts } from "../../features/postSlice";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const {
    post: {
      allPosts: { posts, page },
    },
    user: { id },
  } = useSelector((state) => state);

  const getNextPage = async () => {
    const data = await fetchPostsService({ page: page + 1 });
    dispatch(setAllPosts({ posts: posts.concat(data.posts), page: data.page }));
    return data.posts.length;
  };

  return (
    <section className="home">
      <div className="home__left">
        <ProfileCard id={id} isOwnProfile />
      </div>
      <InfinityScroll getNextPage={getNextPage}>
        <main className="home__center">
          Hello  
        </main>
      </InfinityScroll>
    </section>
  );
};

export default Home;
