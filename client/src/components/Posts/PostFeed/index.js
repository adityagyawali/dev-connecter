import React from "react";
import PropTypes from "prop-types";

import PostItem from "../PostItem";

const PostFeed = props => {
	console.log("props.posts", props.posts);
	return props.posts.map(post => <PostItem post={post} key={post._id} />);
};

PostFeed.propTypes = {
	posts: PropTypes.array.isRequired
};

export default PostFeed;
