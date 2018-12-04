import React from "react";
import { Link } from "react-router-dom";

const ProfileAction = () => {
	return (
		<div>
			<div className="row">
				<Link
					to="/edit-profile"
					className="waves-effect waves-light  blue darken-3 btn-large white-text"
					style={{ outline: "none", border: "none", marginRight: "10px" }}
				>
					<i className="material-icons left">account_circle</i>
					Edit Profile
				</Link>
				<Link
					to="/add-experience"
					className="waves-effect waves-light #64b5f6 blue darken-3 btn-large white-text"
					style={{ outline: "none", border: "none", marginRight: "10px" }}
				>
					<i className="material-icons left">business_center</i>
					Add Experience
				</Link>
				<Link
					to="/add-education"
					className="waves-effect waves-light #64b5f6 blue darken-3 btn-large white-text"
					style={{ outline: "none", border: "none" }}
				>
					<i className="material-icons left">library_books</i>
					Add Education
				</Link>
			</div>
		</div>
	);
};

export default ProfileAction;
