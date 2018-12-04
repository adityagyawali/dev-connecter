import React, { Component } from "react";
import Moment from "react-moment";
class ProfileCred extends Component {
	render() {
		const { experience, education } = this.props.profile;
		const expData = experience.map(exp => (
			<li key={exp._id} style={{ textAlign: "left" }}>
				<h4 style={{ textAlign: "center" }}>{exp.company.toUpperCase()}</h4>
				<p style={{ textAlign: "center", fontWeight: "600" }}>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment> -
					{exp.to === null ? (
						"Present"
					) : (
						<Moment format="YYYY/MM/DD">{exp.to}</Moment>
					)}
				</p>
				<p>
					<span style={{ fontWeight: "550" }}>Position: </span>
					{exp.title}
				</p>
				<p>
					{exp.location === "" ? null : (
						<span>
							<span style={{ fontWeight: "550" }}>Location: </span>
							{exp.location}
						</span>
					)}
				</p>
				<p>
					{exp.description === "" ? null : (
						<span>
							<span style={{ fontWeight: "550" }}>Description: </span>
							{exp.description}
						</span>
					)}
				</p>
			</li>
		));

		const eduData = education.map(edu => (
			<li key={edu._id} style={{ textAlign: "left" }}>
				<h4 style={{ textAlign: "center" }}>{edu.school}</h4>
				<p style={{ textAlign: "center", fontWeight: "600" }}>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment>
					{edu.to === null ? (
						"Present"
					) : (
						<Moment format="YYYY/MM/DD">{edu.to}</Moment>
					)}
				</p>
				<p>
					<span style={{ fontWeight: "550" }}>Degree: </span>
					{edu.degree}
				</p>
				<p>
					<span style={{ fontWeight: "550" }}>Field Of Study: </span>
					{edu.fieldofstudy}
				</p>

				<p>
					{edu.description === "" ? null : (
						<span>
							<span style={{ fontWeight: "550" }}>Description: </span>
							{edu.description}
						</span>
					)}
				</p>
			</li>
		));
		return (
			<div className="row" style={{ display: "flex" }}>
				<div className="col s6">
					<div className="card-panel z-depth-1">
						<h3 className="blue-text">Experience</h3>
						{expData.length > 0 ? (
							<ul>{expData}</ul>
						) : (
							<p>No Experience Listed</p>
						)}
					</div>
				</div>

				<div className="col s6">
					<div className="card-panel z-depth-1">
						<h3 className="blue-text">Education</h3>
						{eduData.length > 0 ? (
							<ul>{eduData}</ul>
						) : (
							<p>No Education Listed</p>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileCred;
