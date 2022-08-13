import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const {
		user: { id },
	} = useSelector(state => state);

  return (
    <section className="home">
      <div className="home__left">
				<ProfileCard id={id} isOwnProfile />
			</div>
    </section>
  )
}

export default Home