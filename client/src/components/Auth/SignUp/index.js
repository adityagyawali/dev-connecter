import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import classnames from "classnames";

import { signUp } from "../../../actions/authAction";

import "./index.css";

class SignUp extends Component {
	state = {
		email: "",
		password: "",
		password2: "",
		name: "",

		errors: {}
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	handleChange = e => {
		let target = e.target;
		let value = target.type === "checkbox" ? target.checked : target.value;
		let name = target.name;

		this.setState({
			[name]: value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state);
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.signUp(newUser, this.props.history);
	};

	render() {
		const { errors } = this.props;
		return (
			<div className="row">
				<h1>Sign Up</h1>
				<p>Create your DevConnector account</p>
				<form className="col s12" onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="input-field col s12">
							<i className="material-icons prefix">account_circle</i>
							<input
								id="name"
								type="text"
								className={errors.name ? "invalid" : "validate"}
								name="name"
								value={this.state.name}
								onChange={this.handleChange}
							/>
							<label htmlFor="name">Full Name</label>
							<span className="helper-text left" data-error={errors.name} />
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<i className="material-icons prefix">email</i>
							<input
								id="email"
								type="email"
								className={errors.email ? "invalid" : "validate"}
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<label htmlFor="email">Email</label>
							<span className="helper-text left" data-error={errors.email}>
								This site uses Gravatar so if you want a profile image, use a
								Gravatar email
							</span>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<i className="material-icons prefix">lock</i>
							<input
								id="password"
								type="password"
								className={errors.password ? "invalid" : "validate"}
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<label htmlFor="password">Password</label>
							<span className="helper-text left" data-error={errors.password} />
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<i className="material-icons prefix">lock</i>
							<input
								id="password2"
								type="password"
								className={errors.password2 ? "invalid" : "validate"}
								name="password2"
								value={this.state.password2}
								onChange={this.handleChange}
							/>
							<label htmlFor="password2">Confirm Password</label>
							<span
								className="helper-text left"
								data-error={errors.password2}
							/>
						</div>
					</div>
					<button
						className="waves-effect waves-light  blue darken-3 btn-large white-text"
						type="submit"
						name="action"
					>
						Submit
						<i className="material-icons right">send</i>
					</button>
				</form>
			</div>
		);
	}
}

SignUp.propTypes = {
	signUp: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default withRouter(
	connect(
		mapStateToProps,
		{ signUp }
	)(SignUp)
);
