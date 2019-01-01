import React, { Component } from "react";
import { Tracker } from "meteor/tracker";
import { Links } from "../api/links";
import { Meteor } from "meteor/meteor";
import LinksListItem from "./LinksListItem";
import { Session } from "meteor/session";
import FlipMove from "react-flip-move";

class LinksList extends Component {
  state = {
    links: []
  };

  // Just after component renders
  componentDidMount() {
    console.log("componentDidmount LinksList");
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe("links");
      const links = Links.find({
        visible: Session.get("showVisible")
      }).fetch();
      this.setState({ links });
    });
  }

  // Right before component removes
  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinksListItems = () => {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links Found</p>
        </div>
      );
    }
    return this.state.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
      // return <p key={link._id}>{link.url}</p>;
    });
  };
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}

export default LinksList;
