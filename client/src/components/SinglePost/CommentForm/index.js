import React, { Component } from "react";
import { addComment } from "../../../actions/postActions";
import { connect } from "react-redux";

import PropTypes from "prop-types";

class CommentForm extends Component {
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
		const { postId } = this.props;
		const newComment = {
			text,
			name: user.name,
			avatar: user.avatar
		};
		this.props.addComment(postId, newComment);

		this.setState({
			text: ""
		});
	};

	render() {
		console.log(" this.props.auth", this.props.auth);
		const { text } = this.state;
		const { errors } = this.props;
		console.log("errors", errors);
		return (
			<div className="row">
				<div className="col s12 m6">
					<div className="card blue-grey darken-1">
						<div className="card-content white-text">
							<span className="card-title">Please Make A Relevent Comment</span>
							<form className="col s12" onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="input-field col s12">
										<textarea
											style={{ color: "white" }}
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
										<label htmlFor="textarea2">write a comment..</label>
										<span className="helper-text" data-error={errors.text} />
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
		);
	}
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addComment }
)(CommentForm);
