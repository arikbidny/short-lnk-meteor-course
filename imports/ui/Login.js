import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";

class Login extends Component {
  state = {
    error: "",
    redirectToReferer: false
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

    Meteor.loginWithPassword({ email }, password, err => {
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
          <h1>Short Link</h1>

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
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Have an account?</Link>
        </div>
      </div>
    );
  }
}

export default Login;
