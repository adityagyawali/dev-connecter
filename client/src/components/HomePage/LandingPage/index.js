import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Segment, Button, Divider } from "semantic-ui-react";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import "./index.css";

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}
	render() {
		return (
			<div className="Landing-page">
				<div className="Homepage">
					<div className="container">
						<div className="users">
							<i className="fas fa-users" />
							<p>Connect with developers around the world.</p>
						</div>
						<div className="search">
							<i className="fas fa-search" />
							<p>Look for the developers all over the world.</p>
						</div>
						<div className="chat">
							<i className="fas fa-comment" />
							<p>Join the conversation.</p>
						</div>
					</div>
				</div>

				<div className="leftbar-container">
					<h1 style={{ color: "black", fontSize: "2.2rem" }}>
						Connect to the developers around the world
					</h1>
					<span style={{ color: "black", fontWeight: 600 }}>
						Join Devconnector today.
					</span>
					<Segment padded>
						<Link style={{ textDecoration: "none" }} to="/sign-in">
							<Button className="login" primary fluid>
								Login
							</Button>
						</Link>
						<Divider style={{ backgroundColor: "#ffffff" }} horizontal>
							Or
						</Divider>
						<Link style={{ textDecoration: "none" }} to="/sign-up">
							<Button primary fluid>
								Sign Up
							</Button>
						</Link>
					</Segment>

					{/* <div className="leftbar-buttons">
						<Link style={{ textDecoration: "none" }} to="/sign-up">
							<button className="signup">SignUp</button>{" "}
						</Link>

						<Link style={{ textDecoration: "none" }} to="/sign-in">
							<button className="login">Login</button>
						
					</div> */}
				</div>
			</div>
		);
	}
}
Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Landing);
