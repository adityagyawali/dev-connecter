import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUp extends Component {
	state = {
		email: "",
		password: "",
		password2: "",
		name: "",
		hasAgreed: false,
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
		console.log(this.state);
	};

	render() {
		return (
			<div className="FormCenter">
				<form onSubmit={this.handleSubmit} className="FormFields">
					<div className="FormField">
						<label className="FormField-Label" htmlFor="name">
							Full Name
						</label>
						<input
							type="text"
							// id="name"
							className="FormField-Input"
							placeholder="Enter your full name"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
						/>
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
					</div>

					<div className="FormField">
						<label className="FormField-CheckboxLabel">
							<input
								className="FormField-Checkbox"
								type="checkbox"
								name="hasAgreed"
								value={this.state.hasAgreed}
								onChange={this.handleChange}
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
export default SignUp;
