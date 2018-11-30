import React, { Component } from "react";
import { Link } from "react-router-dom";
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
			<ul className="logout-header">
				<li className="geekconnector">
					<a role="button" onClick={this.onLogOut} className="logout-anchor">
						<img className="avatar" src={user.avatar} alt={user.name} />{" "}
						<p>Logout</p>
					</a>{" "}
				</li>{" "}
			</ul>
		);
		return (
			<div className="Header">
				<ul className="header-text">
					<Link to="/" className="home-link">
						{" "}
						<li className="geekconnector">GeekConnector </li>{" "}
					</Link>
					<Link to="/profiles" className="home-link">
						{" "}
						<li className="geeks">Geeks </li>
					</Link>
				</ul>
				{isAuthenticated ? authLinks : ""}
			</div>
		);
	}
}

Header.propTypes = {
	auth: PropTypes.object,
	singOut: PropTypes.func
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ singOut, clearCurrentProfile }
)(Header);
