import React, { Component } from "react";
import { Link } from "react-router-dom";
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

	componentWillReceiveProps = nextProps => {
		console.log("nextProps", nextProps);
		if (nextProps.auth.isAuthenticated) {
			//if the login user is authenticated direct it to dashobard
			this.props.history.push("/dashboard");
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
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
			<div className=" FormCenter">
				<h5
					style={{
						textAlign: "center",
						fontSize: 20,
						paddingRight: 40,
						color: "black"
					}}
				>
					Great to see you again!!
				</h5>
				<form onSubmit={this.handleSubmit} className="FormFields">
					<div className="FormField">
						<label className="FormField-Label" htmlFor="email">
							E-Mail Address
						</label>
						<input
							type="email"
							id="email"
							className="FormField-Input"
							placeholder="Enter your email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
						{errors.email && <p className="invalid">{errors.email}</p>}
					</div>

					<div className="FormField">
						<label className="FormField-Label" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							className="FormField-Input"
							placeholder="Enter your password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						{errors.password && <p className="invalid">{errors.password}</p>}
					</div>

					<div className="FormField">
						<button className="FormField-Button mr-20">Sign In</button>{" "}
						<Link to="/sign-up" className="FormField-Link">
							Create an account
						</Link>
					</div>
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	signIn: PropTypes.func,
	auth: PropTypes.obj,
	errors: PropTypes.obj
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ signIn }
)(Login);
