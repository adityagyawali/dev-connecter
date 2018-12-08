import {
	ADD_POST,
	GET_POSTS,
	POST_LOADING,
	DELETE_POST,
	GET_SINGLE_POST
} from "../actions/actionTypes";

const initalState = {
	posts: [],
	post: {},
	loading: false
};

export default (state = initalState, action) => {
	console.log("payload why", action.payload);
	switch (action.type) {
		case POST_LOADING:
			return {
				...state,
				loading: true
			};
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};

		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};

		case GET_SINGLE_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};

		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload)
			};
		default:
			return state;
	}
};
