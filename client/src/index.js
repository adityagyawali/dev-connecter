import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import jwtDecode from "jwt-decode";
import { setAuthToken } from "./utils/setAuthToken";
import { setCurrentUser, singOut } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileActions";

import store from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/font-awesome/css/font-awesome.min.css";

//check for token in localstorage
if (localStorage.jwt) {
	setAuthToken(localStorage.jwt);
	//decode token and get user info
	const decoded = jwtDecode(localStorage.jwt);

	//set user and is authenticated
	store.dispatch(setCurrentUser(decoded));

	//check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//logout user
		store.dispatch(singOut());
		// clear current profile
		store.dispatch(clearCurrentProfile());
		//redirect to login page
		window.location.href = "/sing-in";
	}
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,

	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
