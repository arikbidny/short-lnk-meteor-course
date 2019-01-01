import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Tracker } from "meteor/tracker";
import App from "../imports/ui/layouts/App";
import { Links } from "../imports/api/links";
import "../imports/startup/simple-schema-configuration";
import { Session } from "meteor/session";

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  console.log("isAuthenticated: ", isAuthenticated);
});

Tracker.autorun(() => {
  const links = Links.find().fetch();
  console.log("new links", links);
});

Meteor.startup(() => {
  Session.set("showVisible", true);
  ReactDOM.render(<App />, document.getElementById("app"));
});
