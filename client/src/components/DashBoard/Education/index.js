import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

import { deleteEducation } from "../../../actions/profileActions";

class Education extends Component {
	handleDelete = id => {
		this.props.deleteEducation(id);
	};
	render() {
		const education = this.props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment>-
					{edu.to === null ? (
						" Current"
					) : (
						<Moment format="YYYY/MM/DD">{edu.to}</Moment>
					)}
				</td>
				<td>
					<button
						className="btn-large waves-effect red white-text"
						onClick={() => this.handleDelete(edu._id)}
					>
						Delete
					</button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 style={{ textAlign: "center" }}>Education</h4>
				<table className="responsive">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>

					<tbody>{education}</tbody>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired
};

export default connect(
	null,
	{ deleteEducation }
)(Education);
