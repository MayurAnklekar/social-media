import React from "react";
import { Link } from "react-router-dom";
import "./searchresult.css";

const SearchResults = ({ searchResult, reset }) => {
	return (
		<div className="search-results">
			<div>
				<h3>Users</h3>
				{searchResult.users?.map(user => (
					<Link to={`/user/${user._id}`} key={user._id}>
						<p onClick={reset}>{user.name}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default SearchResults;
