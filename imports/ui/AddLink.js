import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import Modal from "react-modal";

class AddLink extends Component {
  state = {
    url: "",
    isOpen: false,
    error: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const url = this.state.url;

    Meteor.call("links.insert", url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  };

  onChange = e => {
    this.setState({
      url: e.target.value
    });
  };

  handleModalClose = () => {
    this.setState({ isOpen: false, url: "", error: "" });
  };

  render() {
    return (
      <div>
        <button
          className="button"
          onClick={() => this.setState({ isOpen: true })}
        >
          + Add Link
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="URL"
              ref="url"
              value={this.state.url}
              onChange={this.onChange}
            />
            <button className="button">Add Link</button>
            <button
              type="button"
              className="button button--secondary"
              onClick={this.handleModalClose}
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddLink;
