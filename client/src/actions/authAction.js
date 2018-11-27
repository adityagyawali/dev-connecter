import axios from "axios";
import jwtDecode from "jwt-decode";
import { setAuthToken } from "../utils/setAuthToken";
import { GET_ERRORS, GET_CURRENT_USER } from "./actionTypes";

//Register user
export const signUp = (newUser, history) => dispatch => {
	axios
		.post("http://localhost:5000/api/user/register", newUser)
		.then(res => history.push("/sign-in"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//Login user and get the token
export const signIn = newUser => dispatch => {
	axios
		.post("http://localhost:5000/api/user/login", newUser)
		.then(res => {
			//get token from res.data.token
			const { token } = res.data;
			//save token to localstorage
			localStorage.setItem("jwt", token);
			//set the toke to auth header(like in postman)
			setAuthToken(token);
			//now we need to decode user info from token => user jwt-decode module
			const decoded = jwtDecode(token);
			//set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setCurrentUser = decoded => {
	return {
		type: GET_CURRENT_USER,
		payload: decoded
	};
};

//for loggin out user
export const singOut = () => dispatch => {
	//remove token from localstorage
	localStorage.removeItem("jwt");
	//remove auth headers for future request
	setAuthToken(false);
	//dispatch the currentuser with empty object(while loggin in we dispatch user with decoded info)
	dispatch(setCurrentUser({}));
};
