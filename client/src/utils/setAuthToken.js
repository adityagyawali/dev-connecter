import axios from "axios";

export const setAuthToken = token => {
	if (token) {
		//apply to every request
		axios.defaults.headers.common["Authorization"] = token;
	} else {
		//when the user logs out we remove the token from localstorage and this header from everyrequest
		delete axios.defaults.headers.common["Authorization"];
	}
};
