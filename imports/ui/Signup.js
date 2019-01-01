import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

class Signup extends Component {
  state = {
    error: ""
  };

  componentWillMount() {
    const isLogged = Meteor.userId() !== null;
    console.log(isLogged);
    if (isLogged) {
      this.props.history.push("/links");
    }
  }

  onSubmit = e => {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 8) {
      return this.setState({
        error: "Password must be more than 8 characters long"
      });
    }

    Accounts.createUser({ email, password }, err => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: "" });
        this.props.history.push("/links");
      }
    });
  };

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Link</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form
            onSubmit={this.onSubmit}
            noValidate
            className="boxed-view__form"
          >
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input
              type="password"
              ref="password"
              name="password"
              placeholder="Password"
            />
            <button className="button">Create Account</button>
          </form>

          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    );
  }
}

export default Signup;