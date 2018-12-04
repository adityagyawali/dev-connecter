import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { TextFieldGroup } from "../Common/TextFiledGroup";

import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
	state = {
		company: "",
		title: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: "",
		errors: {},
		disabled: false
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.errors !== this.props.errors) {
			this.setState({
				errors: this.props.errors
			});
		}
	};

	onCheck = e => {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { company, title, location, from, to, description } = this.state;
		const experienceData = {
			company,
			title,
			location,
			from,
			to,
			description
		};
		this.props.addExperience(experienceData, this.props.history);
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
				<h3>Add Experience</h3>
				<p>
					Add any job or position that you have had in the past or if you are
					currently working
				</p>
				<div className="left" style={{ marginLeft: 10 }}>
					<span>* = required fields</span>
				</div>

				<form className="col s12" onSubmit={this.handleSubmit}>
					<TextFieldGroup
						name="company"
						value={this.state.company}
						label="* Company"
						onChange={this.handleChange}
						icon="account_balance"
						error={errors.company}
						info="Company you previously worked or currently working on"
					/>

					<TextFieldGroup
						name="title"
						value={this.state.title}
						label="* Job Title"
						onChange={this.handleChange}
						icon="person"
						error={errors.title}
						info="Your current or previous post."
					/>

					<TextFieldGroup
						name="location"
						value={this.state.location}
						label="Location"
						onChange={this.handleChange}
						icon="add_location"
						info="Your location"
					/>
					<TextFieldGroup
						name="from"
						type="date"
						value={this.state.from}
						label=" * From"
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
							<span className="flow-text">
								Still Working In The Current Company?
							</span>
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

							<label htmlFor="textarea1">Job Description</label>
							<span className="helper-text" data-error={errors.description}>
								Tell us more about your job
							</span>
						</div>
					</div>

					<div className="row">
						<button
							className="waves-effect waves-light #64b5f6 blue darken-3 btn-large white-text"
							type="submit"
							name="action"
						>
							Submit
							<i className="material-icons right">send</i>
						</button>
					</div>
				</form>
			</div>
		);
	}
}

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addExperience }
)(withRouter(AddExperience));
