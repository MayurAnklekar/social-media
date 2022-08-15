import { useDispatch, useSelector } from "react-redux";
import InfinityScroll from "../../components/InfinityScroll/InfinityScroll";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { fetchPostsService } from "../../services/postServices";
import { setAllPosts } from "../../features/postSlice";
import AllUsers from "../../components/AllUsers/AllUsers";
import Posts from "../../components/Post/Posts";
import CreatePost from "../../components/CreatePost/CreatePost";
import "./home.css";

const Home = () => {
  const {
    post: {
      allPosts: { posts, page },
    },
    user: { id },
  } = useSelector((state) => state);
  console.log("home ", posts);
  const dispatch = useDispatch();

  const getNextPage = async () => {
    const data = await fetchPostsService({ page: page + 1 });
    dispatch(setAllPosts({ posts: posts.concat(data.posts), page: data.page }));
    return data.posts.length;
  };

  return (
    <div className="home">
      <div className="home__left">
        <ProfileCard id={id} isOwnProfile />
      </div>
      <InfinityScroll getNextPage={getNextPage}>
        <main className="home__center">
          <CreatePost />
          <Posts posts={posts} />
        </main>
      </InfinityScroll>
      <aside className="home__right gradient-border">
				<AllUsers />
			</aside>
    </div>
  );
};

export default Home;
