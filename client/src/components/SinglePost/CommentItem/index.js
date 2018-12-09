import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deleteComment } from "../../../actions/postActions";

import "./index.css";

class CommentItem extends Component {
	onDelete = (postId, commentId) => {
		this.props.deleteComment(postId, commentId);
	};
	render() {
		const { comment, postId, auth } = this.props;
		return (
			<div class="col s12 m8 offset-m2 l6 offset-l3">
				<div class="card-panel grey lighten-5 z-depth-1">
					<div class="row valign-wrapper">
						<div class="col s2">
							<img
								className="responsive-img circle"
								alt={comment._id}
								src={comment.avatar}
								// style={{
								// 	height: 50,
								// 	width: 50,
								// 	borderRadius: "50%",
								// 	margin: "auto"
								// }}
							/>
							<span>{comment.name}</span>
						</div>

						<div class="col s10">
							<span class="black-text">
								<span className="card-content flow-text">{comment.text}</span>
							</span>
						</div>
						<div className="card-action">
							{comment.user === auth.user.id ? (
								<button
									onClick={() => this.onDelete(postId, comment._id)}
									className="btn waves-effect waves-light red"
								>
									DELETE
								</button>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ deleteComment }
)(CommentItem);
