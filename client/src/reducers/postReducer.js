import { ADD_POST } from "../actions/actionTypes";

const initalState = {
	posts: [],
	post: {},
	loading: false
};

export default (state = initalState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.post]
			};
		default:
			return state;
	}
};
