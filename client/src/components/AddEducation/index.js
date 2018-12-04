import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { TextFieldGroup } from "../Common/TextFiledGroup";

import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
	state = {
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
		errors: {},
		disabled: false
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.errors !== this.props.errors) {
			this.setState({
				errors: this.props.errors
			});
		}
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onCheck = e => {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { school, degree, fieldofstudy, from, to, description } = this.state;
		const educationData = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			description
		};
		this.props.addEducation(educationData, this.props.history);
	};

	render() {
		const { errors } = this.state;
		const { profile } = this.props;
		console.log("add exp   ", errors);
		console.log("add profile   ", profile);
		return (
			<div className="row">
				<div className="left" style={{ marginLeft: 10 }}>
					<Link
						to="/dashboard"
						className=" waves-effect #64b5f6 blue darken-3 btn-large white-text"
					>
						Go Back
					</Link>
				</div>
				<h4>Add Education</h4>
				<p>Add any school or bootcamps you have attended</p>
				<div className="left" style={{ marginLeft: 10 }}>
					<span>* = required fields</span>
				</div>

				<form className="col s12" onSubmit={this.handleSubmit}>
					<TextFieldGroup
						name="school"
						value={this.state.school}
						label="* School"
						onChange={this.handleChange}
						icon="account_balance"
						error={errors.school}
						info="Name of School,University or BootCamp"
					/>

					<TextFieldGroup
						name="degree"
						value={this.state.degree}
						label="* Degree"
						onChange={this.handleChange}
						icon="assignment_turned_in"
						error={errors.degree}
						info="Name of Degree"
					/>

					<TextFieldGroup
						name="fieldofstudy"
						value={this.state.fieldofstudy}
						label="* Field of Study"
						onChange={this.handleChange}
						error={errors.fieldofstudy}
						icon="import_contacts"
						info="Your fieldofstudy"
					/>
					<TextFieldGroup
						name="from"
						type="date"
						value={this.state.from}
						label="* From"
						onChange={this.handleChange}
						error={errors.from ? errors.from : ""}
						icon="date_range"
						info="Date you joined the company"
					/>
					<TextFieldGroup
						name="to"
						type="date"
						value={this.state.to}
						label="To"
						onChange={this.handleChange}
						icon="date_range"
						info="Date you left the company"
						disabled={this.state.disabled ? "disabled" : ""}
					/>

					<div className="row left-align">
						<label>
							<input
								type="checkbox"
								value={this.state.current}
								onChange={this.onCheck}
								name="current"
							/>
							<span className="flow-text">Still Studying ?</span>
							<span className="helper-text left" data-error={errors.current} />
						</label>
					</div>

					<div className="row">
						<div className="input-field col s12">
							<i className="material-icons prefix">description</i>
							<textarea
								id="textarea1"
								className="materialize-textarea"
								name="description"
								value={this.state.description}
								onChange={this.handleChange}
								errors={errors.description}
							/>

							<label htmlFor="textarea1">Education Description</label>
							<span className="helper-text" data-error={errors.description}>
								Tell us more about your Education
							</span>
						</div>
					</div>

					<div className="row">
						<button className="waves-effect waves-light #64b5f6 blue darken-3 btn-large white-text">
							Submit
							<i className="material-icons right">send</i>
						</button>
					</div>
				</form>
			</div>
		);
	}
}

AddEducation.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addEducation }
)(withRouter(AddEducation));
