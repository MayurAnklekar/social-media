import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  dp,
  closeIcon,
  searchIcon,
  hamburger,
  homeIcon,
  chatIcon,
} from "../../assets";
import { setIsLoading, toggleSidebar } from "../../features/modalSlice";
import SearchResults from "../SearchResults/SearchResults";
import { fetchUsersService } from "../../services/userServices";
import "./appbar.css";

const Appbar = () => {
  const dispatch = useDispatch();
  const {
    user: { id, profileImage },
    modal: { isSidebarVisible },
  } = useSelector((state) => state);

  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const searchHandler = async (e) => {
    e.preventDefault();
    if (query.length > 0) {
      dispatch(setIsLoading(true));
      const { users } = await fetchUsersService({ query });
      setSearchResult({ users });
      dispatch(setIsLoading(false));
    }
  };

  const reset = () => {
    setQuery("");
    setSearchResult({});
  };

  return (
    <header className={searchResult.users ? "appbar topZ" : "appbar"}>
      <div
        className="hamburger"
        onClick={() => dispatch(toggleSidebar(!isSidebarVisible))}
      >
        <img src={true ? closeIcon : hamburger} alt="hamburger" />
      </div>
      <Link to="/">
        <img src={homeIcon} alt="home" className="home-icon" />
      </Link>
      <form onSubmit={searchHandler} className="searchform">
        <button type="submit" aria-label="search">
          <img src={searchIcon} alt="search" />
        </button>
        <input
          type="text"
          placeholder="Tap to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={reset} type="button" aria-label="clear search">
          <img src={closeIcon} alt="close" className="close" />
        </button>
        {searchResult.users && (
          <SearchResults searchResult={searchResult} reset={reset} />
        )}
      </form>
      <nav className="appbar__profile">
        <Link to={`/user/${id}`}>
          <img
            src={profileImage || dp}
            alt="profileImage"
            className="appbar__profile__dp"
            title="profile"
          />
        </Link>
        <Link to="/chat">
          <img src={chatIcon} alt="chat" className="chat" />
        </Link>
      </nav>
    </header>
  );
};

export default Appbar;
