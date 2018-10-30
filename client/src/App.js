import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Login from "./components/Login";

import "./App.css";

class App extends Component {
	render() {
		return (
			<Router basename="/auth/">
				<div className="App">
					<Header />
					<Homepage />
					<div className="App__Form">
						<div className="PageSwitcher">
							<NavLink
								to="/sign-in"
								activeClassName="PageSwitcher__Item--Active"
								className="PageSwitcher__Item"
							>
								Sign In
							</NavLink>
							<NavLink
								exact
								to="/"
								activeClassName="PageSwitcher__Item--Active"
								className="PageSwitcher__Item"
							>
								Sign Up
							</NavLink>
						</div>

						<div className="FormTitle">
							<NavLink
								to="/sign-in"
								activeClassName="FormTitle__Link--Active"
								className="FormTitle__Link"
							>
								Sign In
							</NavLink>{" "}
							or{" "}
							<NavLink
								exact
								to="/"
								activeClassName="FormTitle__Link--Active"
								className="FormTitle__Link"
							>
								Sign Up
							</NavLink>
						</div>

						<Route exact path="/" component={SignUp} />
						<Route path="/sign-in" component={Login} />
					</div>

					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
