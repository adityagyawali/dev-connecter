import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";

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

		const button = (
			<Link to="create-profile">
				<Button primary>Create Profile</Button>
			</Link>
		);
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
					<div className="card-content">
						<Card
							image={user.avatar}
							header={user.name}
							description="You haven't set up a profile. Please add some information."
							extra={button}
						/>
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
