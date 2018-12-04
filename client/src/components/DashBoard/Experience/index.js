import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

import { deleteExperience } from "../../../actions/profileActions";

class Experience extends Component {
	handleDelete = id => {
		this.props.deleteExperience(id);
	};
	render() {
		console.log("props.experience", this.props.experience);
		const experience = this.props.experience.map(exp => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment>-
					{exp.to === null ? (
						" Current"
					) : (
						<Moment format="YYYY/MM/DD">{exp.to}</Moment>
					)}
				</td>
				<td>
					<button
						className="btn-large waves-effect red white-text"
						onClick={() => this.handleDelete(exp._id)}
					>
						Delete
					</button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 style={{ textAlign: "center" }}>Experience</h4>
				<table className="responsive">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>

					<tbody>{experience}</tbody>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
};

export default connect(
	null,
	{ deleteExperience }
)(Experience);
