import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPosts } from "../../actions/postActions";

import PostForm from "./PostForm";
import PostFeed from "./PostFeed";

import Loader from "../Common/Loader";

class Posts extends Component {
	componentDidMount = () => {
		this.props.getPosts();
	};

	render() {
		console.log("post", this.props.post);
		const { posts, loading } = this.props.post;
		let postContent;

		if (posts === null || loading) {
			postContent = <Loader />;
		} else {
			postContent = <PostFeed posts={posts} />;
		}
		return (
			<div className="col s12 ">
				<PostForm />
				{postContent}
			</div>
		);
	}
}

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(Posts);
