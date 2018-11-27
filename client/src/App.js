import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./components/HomePage/Header";

import Footer from "./components/HomePage/Footer";
import SignUp from "./components/Auth/SignUp/index";
import SignIn from "./components/Auth/Login/index";

import LandingPage from "./components/HomePage/LandingPage";

import { connect } from "react-redux";

import "./App.css";

class App extends Component {
	// componentDidMount() {
	// 	if (this.props.auth.isAuthenticated) {
	// 		this.props.history.push("/dashboard");
	// 	}
	// }
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Route exact path="/" component={LandingPage} />
					<Switch>
						<Route exact path="/sign-in" component={SignIn} />
						<Route exact path="/sign-up" component={SignUp} />
					</Switch>
					<Footer />
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
