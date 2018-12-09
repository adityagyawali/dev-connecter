import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import Header from "./components/HomePage/Header";

import SignUp from "./components/Auth/SignUp/index";
import SignIn from "./components/Auth/Login/index";
import PrivateRoute from "./components/Common/PrivateRoute";
import LandingPage from "./components/HomePage/LandingPage";
import Dashboard from "./components/DashBoard";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";
import AddExperience from "./components/AddExperience";
import AddEducation from "./components/AddEducation";
import Profiles from "./components/Profiles";
import Profile from "./components/Profile";
import Posts from "./components/Posts";
import NotFound from "./components/NotFound";
import SinglePost from "./components/SinglePost";

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
						<Route exact path="/profiles" component={Profiles} />
						<Route exact path="/profile/:handle" component={Profile} />
						<Route exact path="/not-found" component={NotFound} />

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
							<PrivateRoute
								exact
								path="/add-experience"
								component={AddExperience}
							/>
							<PrivateRoute
								exact
								path="/add-education"
								component={AddEducation}
							/>
							<PrivateRoute exact path="/feed" component={Posts} />
							<PrivateRoute
								exact
								path="/postcomment/:id"
								component={SinglePost}
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
