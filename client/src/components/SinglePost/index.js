import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../Common/Loader";
import { getSinglePost } from "../../actions/postActions";

import PostItem from "../Posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class SinglePost extends Component {
	componentDidMount = () => {
		this.props.getSinglePost(this.props.match.params.id);
	};

	render() {
		const { post, loading } = this.props.post;
		console.log("singlepost", this.props.post);

		let singlePostContent;
		if (post === null || loading || Object.keys(post).length === 0) {
			singlePostContent = <Loader />;
		} else {
			singlePostContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentFeed postId={post._id} comments={post.comments} />
					<CommentForm postId={post._id} />
				</div>
			);
		}
		return (
			<div className="row">
				<Link to="/feed" className="btn waves-efect waves-light left">
					Back To Feed
				</Link>
				{singlePostContent}
			</div>
		);
	}
}

SinglePost.propTypes = {
	post: PropTypes.object.isRequired,
	getSinglePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getSinglePost }
)(SinglePost);
