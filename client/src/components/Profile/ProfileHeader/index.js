import React, { Component } from "react";
import { isEmpty } from "../../../validation/is-empty";

class ProfileHeader extends Component {
	render() {
		const {
			user,
			status,
			company,
			location,
			website,
			social
		} = this.props.profile;

		return (
			<div className="row">
				<div className="row">
					<div className="col s12 m8" style={{ margin: "auto" }}>
						<div className="card-panel blue lighten-2 lightgreen-text ">
							<img
								className="circle responsive-img"
								src={user.avatar}
								alt={user.name}
							/>
							<h3>{user.name}</h3>
							<h5>
								{status} {isEmpty(company) ? null : <span>at {company}</span>}
							</h5>
							{isEmpty(location) ? null : <h5>{location}</h5>}

							<div className="row flow-text social-icons">
								{isEmpty(website) ? null : (
									<a
										className="white-text"
										href={website}
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="fas fa-home" />
									</a>
								)}

								{isEmpty(social && social.facebook) ? null : (
									<a
										className="white-text"
										href={social.facebook}
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="fab fa-facebook-square" />
									</a>
								)}

								{isEmpty(social && social.twitter) ? null : (
									<a
										className="white-text"
										href={social.twitter}
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="fab fa-twitter-square" />
									</a>
								)}

								{isEmpty(social && social.linkedin) ? null : (
									<a
										className="white-text"
										href={social.linkedin}
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="fab fa-linkedin" />
									</a>
								)}

								{isEmpty(social && social.instagram) ? null : (
									<a
										className="white-text"
										href={social.instagram}
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="fab fa-instagram" />
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			// <div className="row">
			// 	<div className="col 12">
			// 		<div className="card-panel teal white-text z-depth-1">
			// 			<div className="row">
			// 				<div className="col-4 col-md-3 m-auto">
			// 					<img
			// 						className="rounded-circle"
			// 						src={profile.user.avatar}
			// 						alt=""
			// 					/>
			// 				</div>
			// 			</div>
			// 			<div className="text-center">
			// 				<h1 className="display-4 text-center">{profile.user.name}</h1>
			// 				<p className="lead text-center">
			// 					{profile.status} at {profile.company}
			// 				</p>
			// 				<p>{profile.location}</p>
			// 				<p>
			// 					<a className="text-white p-2" href="#">
			// 						<i className="fas fa-globe fa-2x" />
			// 					</a>
			// 					<a className="text-white p-2" href="#">
			// 						<i className="fab fa-twitter fa-2x" />
			// 					</a>
			// 					<a className="text-white p-2" href="#">
			// 						<i className="fab fa-facebook fa-2x" />
			// 					</a>
			// 					<a className="text-white p-2" href="#">
			// 						<i className="fab fa-linkedin fa-2x" />
			// 					</a>
			// 					<a className="text-white p-2" href="#">
			// 						<i className="fab fa-instagram fa-2x" />
			// 					</a>
			// 				</p>
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>
		);
	}
}

export default ProfileHeader;
