import React, { Component } from "react";
import { addPost } from "../../../actions/postActions";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import "./index.css";

class PostForm extends Component {
	state = {
		text: "",
		errors: {}
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { text } = this.state;
		const { user } = this.props.auth;
		const newPost = {
			text,
			name: user.name,
			avatar: user.avatar
		};
		this.props.addPost(newPost);
		this.setState({
			text: ""
		});
	};

	render() {
		const { text } = this.state;
		const { errors } = this.props;
		return (
			<div className="row">
				<div className="col s12">
					<div className="card left-align">
						<div className="card-content">
							<span className="flow-text">What's on your mind ?</span>
						</div>
						<div className="divider" />
						<div className="card-content black-text">
							<div className="row">
								<form className="col s12" onSubmit={this.handleSubmit}>
									<div className="row">
										<div className="input-field col s12">
											<textarea
												id="textarea2"
												className={
													errors.text
														? "materialize-textarea invalid"
														: "materialize-textarea validate"
												}
												value={text}
												name="text"
												onChange={this.handleChange}
											/>
											<label htmlFor="textarea2">Create A Post</label>
											<span className="helper-text" data-error={errors.text}>
												New in the Tech World ??
											</span>
										</div>
									</div>
									<button
										type="submit"
										className="btn waves-effect waves-light blue"
									>
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addPost }
)(PostForm);
