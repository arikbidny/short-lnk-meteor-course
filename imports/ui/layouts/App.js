import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Signup from "../Signup";
import Login from "../Login";
import Link from "../Link";
import NotFound from "../NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/links" component={Link} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isLogged = Meteor.userId() !== null;
      console.log(isLogged);
      return isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
// const AdminProtectedRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => {
//       const isLogged = Meteor.userId() !== null;
//       const isAdmin = Roles.userIsInRole(Meteor.userId(), "admin");
//       return isLogged && isAdmin ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{ pathname: "/login", state: { from: props.location } }}
//         />
//       );
//     }}
//   />
// );

export default App;
