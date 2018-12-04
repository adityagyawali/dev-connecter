import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../validation/is-empty";

class ProfileItem extends Component {
	render() {
		const { profile } = this.props;
		console.log("items", profile);
		return (
			<div>
				<div className="row">
					<div className="col s12">
						<div className="card horizontal">
							<div className="card-image">
								<img src={profile.user.avatar} alt="user" />
								<h6>{profile.user.name}</h6>
								<p>
									{profile.status}
									{isEmpty(profile.company) ? null : (
										<span>at {profile.company}</span>
									)}
								</p>
								<p>
									{isEmpty(profile.location) ? null : (
										<span>in {profile.location}</span>
									)}
								</p>
							</div>
							<div className="card-stacked">
								<div className="card-content" style={{ margin: 0, padding: 1 }}>
									<h4>Skill Set</h4>
									<ul className="collection">
										{profile.skills.slice(0, 4).map((skill, index) => (
											<li className="collection-item" key={index}>
												{skill}
											</li>
										))}
									</ul>

									{/* {profile.skills.map(skill)} */}
								</div>
								<div className="card-action">
									<Link to={`/profile/${profile.handle}`}>View Profile</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <div className="col s12 m7">
					<div className="card">
						<div className="card-image">
							<img src={profile.user.avatar} alt="usrname" className="" />
							<span className="card-title"></span>
						</div>
						<div className="card-content">
							<h3>{profile.handle}</h3>
							<p>
								{profile.status}
								{isEmpty(profile.company) ? null : (
									<span>at {profile.company}</span>
								)}
							</p>
							<p>
								{isEmpty(profile.location) ? null : (
									<span>at {profile.location}</span>
								)}
							</p>
						</div>
						<div className="card-action">
							<Link to={`/profile/${profile.handle}`}>View Profile</Link>
						</div>
					</div>
				</div> */}
			</div>
		);
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
