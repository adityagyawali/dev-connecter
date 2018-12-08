import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deleteComment } from "../../../actions/postActions";

class CommentItem extends Component {
	onDelete = (postId, commentId) => {
		this.props.deleteComment(postId, commentId);
	};
	render() {
		const { comment, postId, auth } = this.props;
		return (
			<div className="col s12">
				<div
					className="card horizontal row black-text"
					style={{ padding: "2% 0" }}
				>
					<div className="col s3 center-align post-avatar">
						<img
							className="responsive-img circle"
							alt={comment._id}
							src={comment.avatar}
							style={{ width: "50%", margin: "auto" }}
						/>
						<span className="helper-text">{comment.name}</span>
					</div>
					<div className="card-stacked col s9 left-align">
						<span className="card-content flow-text">{comment.text}</span>
					</div>
					{comment.user === auth.user.id ? (
						<button
							onClick={() => this.onDelete(postId, comment._id)}
							className="btn waves-effect waves-light red"
						>
							<i className="material-icons">delete</i>
						</button>
					) : null}
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
