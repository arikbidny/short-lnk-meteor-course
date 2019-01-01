import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class PrivateHeader extends Component {
  onLogout = () => {
    Accounts.logout(() => {
      this.props.history.push("/login");
    });
  };

  render() {
    return (
      <div className="header">
        <div className="header__content">
          <h1 className="header__title">{this.props.title}</h1>
          <button className="button button--link-text" onClick={this.onLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default withRouter(PrivateHeader);
