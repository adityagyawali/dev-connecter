import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../Common/Loader";
import ProfileActions from "./ProfileAction";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import "./index.css";

class DashBoard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	handleDelete = () => {
		this.props.deleteAccount();
	};
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Loader />;
		} else {
			//Check if the logged user has profile
			if (Object.keys(profile).length > 0) {
				console.log("profile dashboard", profile);
				dashboardContent = (
					<div>
						<p style={{ fontSize: "2.2rem" }}>
							Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>{" "}
						</p>
						<ProfileActions />

						<button
							style={{ marginRight: 10 }}
							onClick={this.handleDelete}
							className="btn-large waves-effect red white-text "
						>
							<i className="material-icons">delete_forever</i>
							Delete My Account
						</button>
					</div>
				);
			} else {
				//user is logged in but doesn't have a profiel
				dashboardContent = (
					<div>
						<p>Welcome {user.name}</p>
						<p>You have not yet setup a profile, please add some info.</p>

						<Link
							to="/create-profile"
							className="btn-large waves-effect waves-light"
						>
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className="dashboard">
				<h1 style={{ textAlign: "center", fontSize: "3.2rem" }}>DashBoard</h1>
				{dashboardContent}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

DashBoard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(DashBoard);
