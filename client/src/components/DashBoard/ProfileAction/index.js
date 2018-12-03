import React from "react";
import { Link } from "react-router-dom";

const ProfileAction = () => {
	return (
		<div>
			<div className="row">
				<Link
					to="/edit-profile"
					className="btn-large waves-effect white-text "
					style={{ outline: "none", border: "none", marginRight: "10px" }}
				>
					<i className="material-icons left">account_circle</i>
					Edit Profile
				</Link>
				<Link
					to="/add-experience"
					className="btn-large waves-effect white-text "
					style={{ outline: "none", border: "none", marginRight: "10px" }}
				>
					<i className="material-icons left">business_center</i>
					Add Experience
				</Link>
				<Link
					to="/add-education"
					className="btn-large waves-effect white-text "
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
