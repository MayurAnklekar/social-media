import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import InfinityScroll from "../../components/InfinityScroll/InfinityScroll";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const {
		user: { id },
	} = useSelector(state => state);


  const getNextPage = async () => {
	};

  return (
    <section className="home">
      <div className="home__left">
				<ProfileCard id={id} isOwnProfile />
			</div>
      <InfinityScroll getNextPage={getNextPage}>
      <main className="home__center">
      </main>
      </InfinityScroll>
    </section>
  )
}

export default Home