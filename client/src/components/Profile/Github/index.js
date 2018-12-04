import React, { Component } from "react";

import { Link } from "react-router-dom";

class Github extends Component {
	state = {
		clientId: "1655da20a1b51b40ce2d",
		clientSecret: "75f8cdbb4b618522a1e3b6e9743b0c50f0272e6c",
		countRepo: 5,
		sort: "created: asc",
		repos: []
	};

	componentDidMount = () => {
		const { username } = this.props;
		const { countRepo, sort, clientId, clientSecret } = this.state;
		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${countRepo}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
		)
			.then(res => res.json())
			.then(data =>
				this.setState({
					repos: data
				})
			);
	};

	render() {
		const { username } = this.props;
		const { repos } = this.state;
		console.log("repos", repos);
		const githubRepo = repos.map(repo => (
			<div className="col s12" key={repo.id}>
				<div className="card-panel row">
					<div
						className="card-content col s6"
						style={{ margin: 0, height: "auto" }}
					>
						<h4>
							<Link to={repo.html_url} target="_blank">
								{repo.name}
							</Link>
						</h4>
						<p>{repo.description}</p>
					</div>
					<div
						className="card-content col s6"
						style={{ margin: 0, height: "auto" }}
					>
						<div className="chip blue white-text">
							Stars: {repo.stargazers_count}
						</div>
						<div className="chip grey white-text">
							Watchers: {repo.watchers}
						</div>
						<div className="chip green white-text">
							Fork: {repo.forks_count}
						</div>
					</div>
				</div>
			</div>
		));

		return (
			<div className="row">
				<h3>Latest Github Repos</h3>
				{username === "" ? (
					<p>There is no repos or username is not valid.</p>
				) : (
					githubRepo
				)}
			</div>
		);
	}
}

export default Github;
