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
			<div className="col s12 m7">
				<div className="card horizontal">
					<div className="card-image">
						<img
							className="responsive-img circle"
							alt={comment._id}
							src={comment.avatar}
							style={{
								height: 50,
								width: 50,
								borderRadius: "50%",
								margin: "auto"
							}}
						/>
						<p>{comment.name}</p>
					</div>
					<div className="card-stacked">
						<div className="card-content">
							<span className="card-content flow-text">{comment.text}</span>
						</div>
						<div className="card-action">
							{comment.user === auth.user.id ? (
								<button
									onClick={() => this.onDelete(postId, comment._id)}
									className="btn waves-effect waves-light red"
								>
									{/* <i className="material-icons">delete</i> */}
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
