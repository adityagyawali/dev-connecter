import axios from "axios";
import {
	GET_PROFILE,
	PROFILE_LOADING,
	GET_ERRORS,
	CLEAR_CURRENT_PROFILE,
	SET_CURRENT_USER,
	GET_PROFILES
} from "./actionTypes";

//get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("http://localhost:5000/api/profile")
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

//get all profiles
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("http://localhost:5000/api/profile/all")
		.then(res =>
			dispatch({
				type: GET_PROFILES,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILES,
				payload: null
			})
		);
};

//get single profile
export const getSingleProfile = handle => dispatch => {
	axios
		.get(`http://localhost:5000/api/profile/handle/${handle}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

//profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};
//clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};

//create profile
export const createProfile = (profileData, history) => dispatch => {
	axios
		.post("http://localhost:5000/api/profile", profileData)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//add experience
export const addExperience = (experienceData, history) => dispatch => {
	axios
		.post("http://localhost:5000/api/profile/experience", experienceData)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//add education
export const addEducation = (educationData, history) => dispatch => {
	axios
		.post("http://localhost:5000/api/profile/education", educationData)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//delete experience
export const deleteExperience = id => dispatch => {
	axios
		.delete(`http://localhost:5000/api/profile/experience/${id}`)
		.then(res => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
//delete education
export const deleteEducation = id => dispatch => {
	axios
		.delete(`http://localhost:5000/api/profile/education/${id}`)
		.then(res => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

//delete Account
export const deleteAccount = () => dispatch => {
	if (window.confirm("Are you sure? This cannot be undone!"))
		axios
			.delete("http://localhost:5000/api/profile")
			.then(res =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
};
