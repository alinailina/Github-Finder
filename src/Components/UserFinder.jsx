import React, { Component } from "react";
import UserForm from "./UserForm";
import Axios from "axios";

export class UserFinder extends Component {
  state = {
    name: null,
    email: null,
    blog: null,
    location: null,
    bio: null,
    repos: null
  };

  getUser = e => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    if (user) {
      Axios.get(`https://api.github.com/users/${user}`).then(res => {
        const name = res.data.name;
        const email = res.data.email;
        const blog = res.data.blog;
        const location = res.data.location;
        const bio = res.data.bio;
        const repos = res.data.public_repos;

        console.log(repos);
        this.setState({ name, email, blog, location, bio, repos });
      });
    } else {
      return;
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Github Finder</h1>
        <UserForm getUser={this.getUser} />

        {this.state.name ? <p>Name: {this.state.name}</p> : null}
        {this.state.email ? <p>Email: {this.state.email}</p> : null}
        {this.state.blog ? (
          <p>
            Website: <a>{this.state.blog}</a>
          </p>
        ) : null}
        {this.state.location ? <p>Location: {this.state.location}</p> : null}
        {this.state.bio ? <p>Bio: {this.state.bio}</p> : null}
        {this.state.repos ? (
          <p>Number of repos: {this.state.repos}</p>
        ) : (
          <p>Please enter a username</p>
        )}
      </div>
    );
  }
}

export default UserFinder;
