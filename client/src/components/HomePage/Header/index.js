import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { singOut } from "../../../actions/authAction";
import { clearCurrentProfile } from "../../../actions/profileActions";
import "./index.css";

class Header extends Component {
	onLogOut = e => {
		e.preventDefault();
		this.props.clearCurrentProfile();
		this.props.singOut();
	};
	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<ul className="right valign-wrapper">
				<li className="post-feed">
					<NavLink to="/feed">Post Feed</NavLink>
				</li>
				<li className="dashboard">
					<NavLink to="/dashboard">Dashboard</NavLink>
				</li>
				<li className="logout" style={{ display: "flex" }}>
					<a href="true" onClick={this.onLogOut} style={{ display: "flex" }}>
						<img
							src={user.avatar}
							alt={user.name}
							className="circle responsive-img"
							style={{
								height: 40,
								width: "35px",
								marginRight: "10px",
								marginTop: 10
							}}
						/>
						<span>Logout</span>
					</a>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="right">
				<li>
					<NavLink to="/sign-up">Sign Up</NavLink>
				</li>
				<li>
					<NavLink to="/sign-in">Log in</NavLink>
				</li>
			</ul>
		);

		return (
			// <nav className="indigo darken-4">
			// 	<div className="nav-wrapper container">
			// 		<ul className="left">
			// 			<li>
			// 				<NavLink
			// 					to="/"
			// 					className="logo mg-70 scale-transition transparent"
			// 				>
			// 					DevConnector
			// 				</NavLink>
			// 			</li>
			// 			<li>
			// 				<NavLink to="/profile">Developers</NavLink>
			// 			</li>
			// 		</ul>

			// 		{isAuthenticated ? authLinks : guestLinks}
			// 	</div>
			// </nav>

			<nav>
				<div className="nav-wrapper" style={{ backgroundColor: "#312727" }}>
					<ul style={{ display: "flex" }} className="left">
						<NavLink to="/" className="logo mg-70 scale-transition transparent">
							DevConnector
						</NavLink>
						<li>
							<NavLink to="/profiles">Developers</NavLink>
						</li>
					</ul>
					{isAuthenticated ? authLinks : guestLinks}
				</div>
			</nav>
		);
	}
}

Header.propTypes = {
	auth: PropTypes.object.isRequired,
	singOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ singOut, clearCurrentProfile }
)(Header);
