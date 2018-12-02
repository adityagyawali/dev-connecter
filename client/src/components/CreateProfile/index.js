import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createProfile } from "../../actions/profileActions";
import {
	Form,
	Input,
	Button,
	TextArea,
	Grid,
	GridColumn
} from "semantic-ui-react";

import "./index.css";
class CreateProfile extends Component {
	state = {
		displaySocialInputs: false,
		handle: "",
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: "",
		errors: {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			console.log("errors createprofiel", nextProps.errors);
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,

			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};
		this.props.createProfile(profileData, this.props.history);
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	render() {
		const { errors, displaySocialInputs } = this.state;
		let socialInputs;
		if (displaySocialInputs) {
			socialInputs = (
				<GridColumn>
					<Input
						label="facebook f"
						placeholder="facebook "
						onChange={this.handleChange}
						value={this.state.facebook}
						name="facebook"
						error={errors.facebook}
					/>
					<Input
						label="facebook f"
						placeholder="twitter"
						onChange={this.handleChange}
						value={this.state.twitter}
						name="twitter"
						error={errors.twitter}
					/>
					<Input
						label="facebook f"
						placeholder="linkedin"
						onChange={this.handleChange}
						value={this.state.linkedin}
						name="linkedin"
						error={errors.linkedin}
					/>
					<Input
						label="facebook f"
						placeholder="youtube"
						onChange={this.handleChange}
						value={this.state.youtube}
						name="youtube"
						error={errors.youtube}
					/>
					<Input
						label="facebook f"
						placeholder="instagram"
						onChange={this.handleChange}
						value={this.state.instagram}
						name="instagram"
						error={errors.instagram}
					/>
				</GridColumn>
			);
		}

		const options = [
			{ label: "* Select Professional Status", value: 0 },
			{ label: "Developer", value: "Developer" },
			{ label: "Junior Developer", value: "Junior Developer" },
			{ label: "Senior Developer", value: "Senior Developer" },
			{ label: "Manager", value: "Manager" },
			{ label: "Student or Learning", value: "Student or Learning" },
			{ label: "Instructor or Teacher", value: "Instructor or Teacher" },
			{ label: "Intern", value: "Intern" },
			{ label: "Other", value: "Other" }
		];
		return (
			<div className="create-profile">
				<Button primary>Go Back</Button>

				<h1 className="container">Create Your Profile</h1>
				<p>Let's get some information to make your profile stand out</p>
				<span>*=required</span>

				<Form onSubmit={this.handleSubmit}>
					<Grid columns={2} relaxed>
						<GridColumn>
							<Form.Field required>
								<label>Profile handle</label>
								<Input
									placeholder="Profile handle should be unique"
									onChange={this.handleChange}
									value={this.state.handle}
									name="handle"
									error={errors.handle}
								/>
							</Form.Field>
							<Form.Select
								fluid
								options={options}
								// placeholder="Select Your Profession"
								value={this.state.status}
								name="status"
								error={errors.status}
							/>
							<Form.Field>
								<label>Company</label>
								<Input
									placeholder="Company you work for"
									onChange={this.handleChange}
									value={this.state.company}
									name="company"
									error={errors.company}
								/>
							</Form.Field>
							<Form.Field>
								<label>Website</label>
								<Input
									placeholder="Could be your own or a company website"
									onChange={this.handleChange}
									value={this.state.website}
									name="website"
									error={errors.website}
								/>
							</Form.Field>
							<Form.Field>
								<label>Location</label>
								<Input
									placeholder="City & state suggested (eg. Boston, MA)"
									onChange={this.handleChange}
									value={this.state.location}
									name="location"
									error={errors.location}
								/>
							</Form.Field>
							<Form.Field>
								<label>Skills</label>
								<Input
									placeholder="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
									onChange={this.handleChange}
									value={this.state.skills}
									name="skills"
									error={errors.skills}
								/>
							</Form.Field>
							<Form.Field>
								<label>Github Username</label>
								<Input
									placeholder="If you want your latest repos and a Github link, include your username"
									onChange={this.handleChange}
									value={this.state.githubusername}
									name="githubusername"
									error={errors.githubusername}
								/>
							</Form.Field>
							<Form.Field required>
								<label>Bio</label>
								<TextArea
									placeholder="Tell us a little about yourself"
									onChange={this.handleChange}
									value={this.state.bio}
									name="bio"
									error={errors.bio}
								/>
							</Form.Field>
						</GridColumn>
						<GridColumn>
							<div
								className="social-media"
								style={{ display: "flex", flexDirection: "column" }}
							>
								<Button
									type="button"
									onClick={() =>
										this.setState(prevState => ({
											displaySocialInputs: !prevState.displaySocialInputs
										}))
									}
									style={{ marginBottom: 5 }}
								>
									Add Social Links
								</Button>
								{socialInputs}
							</div>
						</GridColumn>
					</Grid>
					<Button primary>Submit</Button>
				</Form>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(CreateProfile));
