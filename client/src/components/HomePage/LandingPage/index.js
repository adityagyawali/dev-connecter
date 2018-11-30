import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Segment, Button, Divider } from "semantic-ui-react";

import "./index.css";

class Landing extends Component {
	render() {
		return (
			<div className="App-1">
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
					<h1 style={{ color: "black" }}>
						Connect to the developers around the world
					</h1>
					<span style={{ color: "black", fontWeight: 600 }}>
						Join Devconnector today.
					</span>
					<Segment padded>
						<Link style={{ textDecoration: "none" }} to="/sign-in">
							<Button primary fluid>
								Login
							</Button>
						</Link>
						<Divider horizontal>Or</Divider>
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

export default Landing;
