import React from "react";
import "./index.css";

const Homepage = () => {
	return (
		<div className="Homepage">
			<div className="container">
				<div className="users">
					<i className="fas fa-users" />
					<p>Connect with developers around the world.</p>
				</div>
				<div className="search">
					<i className="fas fa-search" />
					<p>Look for the developers all over the world.</p>
				</div>
				<div className="chat">
					<i className="fas fa-comment" />
					<p>Join the conversation.</p>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
