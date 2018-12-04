import React, { Component } from "react";
import PropTypes from "prop-types";

import { isEmpty } from "../../../validation/is-empty";

class ProfileAbout extends Component {
	render() {
		const { profile } = this.props;
		//Get First Name
		const firstName = profile.user.name.trim().split(" ")[0];

		//skills
		const skills = profile.skills.map((skill, i) => (
			<div className="chip" key={i}>
				{skill}
			</div>
		));
		return (
			<div>
				<div className="row">
					<div className="col s12 m8" style={{ margin: "auto", float: "none" }}>
						<div className="card z-depth-1">
							<div
								className="card-content #64B5F6"
								style={{ margin: 0, height: "auto" }}
							>
								<h3 className="blue-text">
									{firstName}
									's Bio
								</h3>
								{isEmpty(profile.bio) ? (
									<span>{firstName} doesn't have a bio !</span>
								) : (
									<span>{profile.bio}</span>
								)}
							</div>
							<div className="divider" />
							<div
								className="card-content"
								style={{ margin: 0, height: "auto" }}
							>
								<h3 className="blue-text">Skills Set</h3>
								{skills}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
