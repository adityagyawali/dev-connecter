import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deletePost, addLike, removeLike } from "../../../actions/postActions";
import "./index.css";
class PostItem extends Component {
	handleDelete = id => {
		console.log(id);
		this.props.deletePost(id);
	};

	onLike = id => {
		this.props.addLike(id);
	};

	onUnLike = id => {
		this.props.removeLike(id);
	};

	findUserLike = likes => {
		const { auth } = this.props;
		if (likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		}
	};
	render() {
		const { post, auth, showActions } = this.props;

		console.log("post", post);
		// const {auth} = this.porps
		console.log("auth", this.props.auth);
		return (
			// <div className="col s12 m7">
			// 	<div className="card horizontal">
			// 		<div className="card-image">
			// 			<img src={post.avatar} alt="user" />
			// 			{post.name}
			// 		</div>
			// 		<div className="card-stacked">
			// 			<div className="card-content">
			// 				<p>{post.text}</p>
			// 			</div>
			// 			<div className="card-action">
			// 				{showActions ? (
			// 					<React.Fragment>
			// 						{post.likes.length > 0 ? (
			// 							<a
			// 								href
			// 								onClick={() => this.onLike(post._id)}
			// 								className="waves-effect waves-light"
			// 								style={{ color: "blue" }}
			// 							>
			// 								<i className="material-icons"> thumb_up</i>
			// 								<span className="helper-text">{post.likes.length}</span>
			// 							</a>
			// 						) : (
			// 							<a
			// 								href
			// 								onClick={() => this.onLike(post._id)}
			// 								className="waves-effect waves-light"
			// 								style={{ color: "grey" }}
			// 							>
			// 								<i className="material-icons"> thumb_up</i>
			// 								<span className="helper-text">{post.likes.length}</span>
			// 							</a>
			// 						)}

			// 						<a
			// 							href
			// 							onClick={() => this.onUnLike(post._id)}
			// 							className="waves-effect waves-light"
			// 							style={{ color: "grey" }}
			// 						>
			// 							<i className="material-icons">thumb_down</i>
			// 						</a>
			// 						<Link
			// 							to={`/postcomment/${post._id}`}
			// 							className="btn waves-effect waves-light"
			// 						>
			// 							Comments
			// 						</Link>
			// 						{post.user === auth.user.id ? (
			// 							<button
			// 								onClick={() => this.handleDelete(post._id)}
			// 								className="btn waves-effect waves-light red"
			// 							>
			// 								<i className="material-icons">delete</i>
			// 							</button>
			// 						) : null}
			// 					</React.Fragment>
			// 				) : null}
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>

			<div className="col s12 m8 offset-m2 l6 offset-l3">
				<div className="card-panel grey lighten-5 z-depth-1">
					<div className="row valign-wrapper">
						<div
							className="col s2"
							style={{ display: "flex", flexDirection: "column" }}
						>
							<img src={post.avatar} alt="" className="circle responsive-img" />
							{post.name.split(" ")[0]}
						</div>
						<div className="col s10">
							<span className="black-text">
								<p>{post.text}</p>
							</span>
						</div>
					</div>
					<div className="card-action">
						{showActions ? (
							<React.Fragment>
								{post.likes.length > 0 ? (
									<a
										href
										onClick={() => this.onLike(post._id)}
										className="waves-effect waves-light"
										style={{ color: "blue" }}
									>
										<i style={{ marginRight: 10 }} className="material-icons">
											{" "}
											thumb_up
										</i>
										<span className="helper-text">{post.likes.length}</span>
									</a>
								) : (
									<a
										href
										onClick={() => this.onLike(post._id)}
										className="waves-effect waves-light"
										style={{ color: "grey" }}
									>
										<i style={{ marginRight: 10 }} className="material-icons">
											{" "}
											thumb_up
										</i>
										<span className="helper-text">{post.likes.length}</span>
									</a>
								)}

								<a
									href
									onClick={() => this.onUnLike(post._id)}
									className="waves-effect waves-light"
									style={{ color: "grey", marginRight: 10 }}
								>
									<i style={{ marginRight: 10 }} className="material-icons">
										thumb_down
									</i>
								</a>
								<Link
									to={`/postcomment/${post._id}`}
									className="btn waves-effect waves-light"
									style={{ marginRight: 10 }}
								>
									<i class="material-icons">comment</i>
								</Link>
								{post.user === auth.user.id ? (
									<button
										onClick={() => this.handleDelete(post._id)}
										className="btn waves-effect waves-light red"
									>
										<i className="material-icons">delete</i>
									</button>
								) : null}
							</React.Fragment>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.defaultProps = {
	showActions: true
};

PostItem.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ deletePost, addLike, removeLike }
)(PostItem);
