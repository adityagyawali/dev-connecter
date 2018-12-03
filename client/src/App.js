import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import Header from "./components/HomePage/Header";
// import Footer from "./components/HomePage/Footer";
import SignUp from "./components/Auth/SignUp/index";
import SignIn from "./components/Auth/Login/index";
import PrivateRoute from "./components/Common/PrivateRoute";
import LandingPage from "./components/HomePage/LandingPage";
import Dashboard from "./components/DashBoard";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";

import "./App.css";

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<div className="app-container">
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/sign-in" component={SignIn} />
						<Route exact path="/sign-up" component={SignUp} />
						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute
								exact
								path="/create-profile"
								component={CreateProfile}
							/>
							<PrivateRoute
								exact
								path="/edit-profile"
								component={EditProfile}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

App.propTypes = {
	auth: PropTypes.object
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(App);
// export default App;
