import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Loader from "../Common/Loader";

import { getProfiles } from "../../actions/profileActions";

import ProfileItems from "./ProfileItems";
class Profiles extends Component {
	componentDidMount = () => {
		this.props.getProfiles();
	};

	render() {
		const { profiles, loading } = this.props.profile;
		console.log("profile profiles", profiles);
		let profileItems;
		if (profiles === null || loading) {
			profileItems = <Loader />;
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map(profile => (
					<ProfileItems key={profile._id} profile={profile} />
				));
			} else {
				profileItems = <h4>No Profiles Found</h4>;
			}
		}
		return (
			<div>
				<div style={{ textAlign: "center" }}>
					<h2 className="header">Developer Profiles</h2>
					<p>Browse and connect with developers</p>
				</div>
				{profileItems}
			</div>
		);
	}
}

Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfiles }
)(Profiles);
