import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { TextFieldGroup } from "../Common/TextFiledGroup";

import { isEmpty } from "../../validation/is-empty";

class EditProfile extends Component {
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
	//1.first this gets the current profile
	componentDidMount() {
		this.props.getCurrentProfile();
		console.log(this.props.getCurrentProfile);
	}

	//3

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.profile.profile !== this.props.profile.profile) {
			const { profile } = this.props.profile;
			console.log("profile", profile);
			const skills = profile.skills.join(",");
			console.log("skills", skills);

			//if user hasn't fill the profile filed previously make it a empty string
			let {
				handle,
				status,
				company,
				website,
				location,
				githubusername,
				bio,
				social,
				twitter,
				facebook,
				instagram,
				youtube,
				linkedin
			} = profile;
			company = !isEmpty(company) ? company : "";
			website = !isEmpty(website) ? website : "";
			location = !isEmpty(location) ? location : "";
			githubusername = !isEmpty(githubusername) ? githubusername : "";
			bio = !isEmpty(bio) ? bio : "";
			social = !isEmpty(social) ? social : {};
			twitter = !isEmpty(social.twitter) ? social.twitter : "";
			facebook = !isEmpty(social.facebook) ? social.facebook : "";
			instagram = !isEmpty(social.instagram) ? social.instagram : "";
			youtube = !isEmpty(social.youtube) ? social.youtube : "";
			linkedin = !isEmpty(social.linkedin) ? social.linkedin : "";

			// Set component fields state
			this.setState({
				handle,
				company,
				website,
				location,
				status,
				skills,
				githubusername,
				bio,
				twitter,
				facebook,
				linkedin,
				youtube,
				instagram
			});
		}
	};

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
				<div>
					<TextFieldGroup
						name="facebook"
						label="Facebook"
						value={this.state.facebook}
						error={errors.facebook}
						onChange={this.handleChange}
					/>
					<TextFieldGroup
						name="twitter"
						label="Twitter"
						value={this.state.twitter}
						error={errors.twitter}
						onChange={this.handleChange}
					/>
					<TextFieldGroup
						name="linkedin"
						label="Linkedin"
						value={this.state.linkedin}
						error={errors.linkedin}
						onChange={this.handleChange}
					/>
					<TextFieldGroup
						name="instagram"
						label="Instagram"
						value={this.state.instagram}
						error={errors.instagram}
						onChange={this.handleChange}
					/>
				</div>
			);
		}

		return (
			<div className="row">
				<h1>Edit Your Current Profile</h1>

				<form className="col s12">
					<TextFieldGroup
						name="handle"
						value={this.state.handle}
						label="* Profile Handle"
						onChange={this.handleChange}
						icon="insert_link"
						error={errors.handle}
						info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
					/>

					<div className="input-field col s12">
						<select
							className="browser-default"
							value={this.state.status}
							name="status"
							onChange={this.handleChange}
						>
							<option value="" disabled defaultValue>
								* Select Professional Status
							</option>
							<option value="Developer">Developer</option>
							<option value="Junior Developer">Junior Developer</option>
							<option value="Senior Developer">Senior Developer</option>
							<option value="Manager">Manager</option>
							<option value="Student or Learning">Student or Learning</option>
							<option value="Instructor or Teacher">
								Instructor or Teacher
							</option>
							<option value="Intern">Intern</option>
							<option value="Other">Other</option>
						</select>
						<span className="helper-text left red-text">
							{errors.status ? errors.status : ""}
						</span>
						<span
							className={
								errors.status ? "helper-text left red-text" : "helper-text left"
							}
						>
							{errors.status
								? errors.status
								: "Give us an idea of where you are at in your career"}
						</span>
					</div>

					<TextFieldGroup
						name="company"
						value={this.state.company}
						label="Company"
						onChange={this.handleChange}
						icon="account_balance"
						info="Could be your own company or one you work for"
					/>

					<TextFieldGroup
						name="website"
						value={this.state.website}
						label="Website"
						onChange={this.handleChange}
						icon="language"
						info="Could be your own or a company website"
					/>

					<TextFieldGroup
						name="location"
						value={this.state.location}
						label="Location"
						onChange={this.handleChange}
						icon="location_on"
						info="City & state suggested (eg. Boston, MA)"
					/>

					<TextFieldGroup
						name="skills"
						value={this.state.skills}
						label="* Skills"
						onChange={this.handleChange}
						error={errors.skills}
						icon="format_list_bulleted"
						info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
					/>

					<TextFieldGroup
						name="githubusername"
						value={this.state.githubusername}
						label="Github Username"
						onChange={this.handleChange}
						icon="code"
						info="If you want your latest repos and a Github link, include your username"
					/>

					<div className="row">
						<div className="input-field col s12">
							<textarea
								name="bio"
								id="textarea2"
								className="materialize-textarea"
								value={this.state.bio}
								onChange={this.handleChange}
								data-length="120"
							/>
							<label htmlFor="textarea2">A short bio of yourself</label>
						</div>
					</div>

					<div className="row">
						<button
							className="btn waves-effect waves-light left"
							onClick={e => {
								e.preventDefault();
								this.setState(prevState => ({
									displaySocialInputs: !prevState.displaySocialInputs
								}));
							}}
						>
							Add Social Network Links
						</button>
						{socialInputs}
						<div className="row">
							<button
								className="waves-effect waves-light #64b5f6 blue darken-3 btn-large white-text"
								type="submit"
								name="action"
								onClick={this.handleSubmit}
							>
								Submit
								<i className="material-icons right">send</i>
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

EditProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
};
//2 then we get the profile
const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createProfile, getCurrentProfile }
)(withRouter(EditProfile));
