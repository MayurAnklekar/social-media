import React, {useEffect} from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import InfinityScroll from "../../components/InfinityScroll/InfinityScroll";
import CreatePost from "../../components/CreatePost/CreatePost";
import { fetchPostsService } from "../../services/postServices";
import { setUserPosts } from "../../features/postSlice";
import AllUsers from "../../components/Online/AllUsers";

const Profile = () => {
    const { id } = useParams();
    const {
        userPosts: { posts, page },
    } = useSelector((state) => state.post);
    const isOwnProfile = id === useSelector((state) => state.user.id);


    const dispatch = useDispatch();

    useEffect(() => {
		(async () => {
			const data = await fetchPostsService({ userId: id });
			if (data) dispatch(setUserPosts(data));
		})();
	}, [dispatch, id]);



    const getNextPage = async () => {
		const data = await fetchPostsService({ userId: id, page: page + 1 });
		dispatch(setUserPosts({ posts: posts.concat(data.posts), page: data.page }));
		return data.posts.length;
	};
    return (
        <section className="profile">
            <article className="profile__left">
                <ProfileCard id={id} isOwnProfile={isOwnProfile} />
            </article>
            <InfinityScroll getNextPage={getNextPage}>
				<article className="profile__center">
					{isOwnProfile && <CreatePost />}
					{posts.length < 1 && <h2>No Posts</h2>}
				</article>
			</InfinityScroll>
            <article className="profile__right gradient-border">
				<AllUsers />
			</article>
        </section>
    );
};

export default Profile;
