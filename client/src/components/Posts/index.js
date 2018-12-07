import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PostForm from "./PostForm";
import Loader from "../Common/Loader";

class Posts extends Component {
	render() {
		return (
			<div className="col s12 ">
				<PostForm />
			</div>
		);
	}
}

export default Posts;
