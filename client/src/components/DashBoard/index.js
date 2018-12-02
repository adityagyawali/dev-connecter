import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Loader from "../Common/Loader";
import { getCurrentProfile } from "../../actions/profileActions";
import "./index.css";
class DashBoard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Loader />;
		} else {
			//Check if the logged user has profile
			if (Object.keys(profile).length > 0) {
				dashboardContent = <h1>TODO: DISPLAY PROFILE</h1>;
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
				<h1>DashBoard</h1>
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
	getCurrentProfile: PropTypes.func,
	auth: PropTypes.object,
	profile: PropTypes.object
};

export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(DashBoard);
