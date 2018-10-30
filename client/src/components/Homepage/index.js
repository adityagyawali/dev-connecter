import React from "react";
import "./index.css";

const Homepage = () => {
	return (
		<div className="Homepage">
			<div className="container">
				<div className="users">
					<i class="fas fa-users" />
					<p style={{ color: "white", fontSize: 20 }}>
						Connect with developers around the world.
					</p>
				</div>
				<div className="search">
					<i class="fas fa-search" />
					<p style={{ color: "white", fontSize: 20 }}>
						Look for the developers all over the world.
					</p>
				</div>
				<div className="chat">
					<i class="fas fa-comment" />
					<p style={{ color: "white", fontSize: 20 }}>Join the conversation.</p>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
