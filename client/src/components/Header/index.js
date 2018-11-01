import React from "react";
import { Link } from "react-router-dom";

import "./index.css";
export default () => {
	return (
		<div className="Header">
			<ul className="header-text">
				<Link to="/" className="home-link">
					{" "}
					<li className="geekconnector">GeekConnector </li>{" "}
				</Link>
				<Link to="/profiles" className="home-link">
					{" "}
					<li className="geeks">Geeks </li>
				</Link>
			</ul>
		</div>
	);
};
