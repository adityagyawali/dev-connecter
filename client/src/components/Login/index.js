import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
	state = {
		email: "",
		password: "",
		errors: {}
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

		console.log("The form was submitted with the following data:");
		console.log(this.state);
	};

	render() {
		return (
			<div className="FormCenter">
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
					</div>

					<div className="FormField">
						<button className="FormField-Button mr-20">Sign In</button>{" "}
						<Link to="/" className="FormField-Link">
							Create an account
						</Link>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
