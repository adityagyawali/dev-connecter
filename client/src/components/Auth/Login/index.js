import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { signIn } from "../../../actions/authAction";
import "./index.css";

class Login extends Component {
	state = {
		email: "",
		password: "",
		errors: {}
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log(prevProps);
		if (prevProps.errors !== this.props.errors) {
			this.setState({
				errors: this.props.errors
			});
		}
		if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	};

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
		const newUser = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.signIn(newUser);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="row">
				<h1>Log In</h1>
				<p>Sign in to your DevConnector account</p>
				<form className="col s12" onSubmit={this.handleSubmit}>
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
							<span className="helper-text left" data-error={errors.email} />
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

Login.propTypes = {
	signIn: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ signIn }
)(Login);
