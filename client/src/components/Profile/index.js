import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCred from "./ProfileCred";
import Github from "./Github";
import Loader from "../Common/Loader";

import { getSingleProfile } from "../../actions/profileActions";
class Profile extends Component {
	componentDidMount = () => {
		console.log("this.props", this.props);
		if (this.props.match.params.handle) {
			this.props.getSingleProfile(this.props.match.params.handle);
		}
	};

	// componentDidUpdate = (prevProps, prevState) => {
	// 	if (prevProps.profile.profile === null && prevProps.profile.loading) {
	// 		this.props.history.push("/not-found");
	// 	}
	// };

	render() {
		console.log("this.props.auth", this.props.auth);
		console.log("yolo", this.props.profile);
		const { profile, loading } = this.props.profile;

		let profileContent;
		if (profile === null || loading) {
			profileContent = <Loader />;
		} else {
			profileContent = (
				<div className="row">
					<div className="left" style={{ marginLeft: 10 }}>
						<Link
							to="/profiles"
							className=" waves-effect #64b5f6 blue darken-3 btn-large white-text"
						>
							Back To Profiles
						</Link>
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCred profile={profile} />
					{profile.githubusername ? (
						<Github username={profile.githubusername} />
					) : (
						""
					)}
				</div>
			);
		}
		return <div>{profileContent}</div>;
	}
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	getSingleProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getSingleProfile }
)(Profile);
