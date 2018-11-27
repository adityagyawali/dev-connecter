import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

import { signUp } from "../../../actions/authAction";

import "./index.css";

class SignUp extends Component {
	state = {
		email: "",
		password: "",
		password2: "",
		name: "",
		hasAgreed: false,
		errors: {}
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps = nextProps => {
		console.log("nextPorps", nextProps);
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
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
		const { errors } = this.state;
		return (
			<div className="FormCenter">
				<h5
					style={{
						textAlign: "center",
						fontSize: 20,
						paddingRight: 40,
						color: "#1986df"
					}}
				>
					Create a new account!!
				</h5>
				<form onSubmit={this.handleSubmit} className="FormFields">
					<div className="FormField">
						<label className="FormField-Label" htmlFor="name">
							Full Name
						</label>
						<input
							type="text"
							// id="name"
							className={classnames("FormField-Input", {
								"is-invalid": errors.name
							})}
							placeholder="Enter your full name"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
						/>
						{errors.name && <p className="invalid">{errors.name}</p>}
					</div>

					<div className="FormField">
						<label className="FormField-Label" htmlFor="email">
							E-Mail Address
						</label>
						<input
							type="email"
							// id="email"
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
							// id="password"
							className="FormField-Input"
							placeholder="Enter your password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						{errors.password && <p className="invalid">{errors.password}</p>}
					</div>
					<div className="FormField">
						<label className="FormField-Label" htmlFor="password">
							Confirm Password
						</label>
						<input
							type="password"
							// id="password2"
							className="FormField-Input"
							placeholder="Confirm password"
							name="password2"
							value={this.state.password2}
							onChange={this.handleChange}
						/>
						{errors.password2 && <p className="invalid">{errors.password2}</p>}
					</div>

					<div className="FormField">
						<label className="FormField-CheckboxLabel">
							<input
								className="FormField-Checkbox"
								type="checkbox"
								name="hasAgreed"
								value={this.state.hasAgreed}
								onChange={this.handleChange}
								// required
							/>{" "}
							I agree all statements in{" "}
							<a href="/" className="FormField-TermsLink">
								terms of service
							</a>
						</label>
					</div>

					<div className="FormField">
						<button className="FormField-Button mr-20">Sign Up</button>{" "}
						<Link to="/sign-in" className="FormField-Link">
							I'm already member
						</Link>
					</div>
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

export default connect(
	mapStateToProps,
	{ signUp }
)(withRouter(SignUp));
