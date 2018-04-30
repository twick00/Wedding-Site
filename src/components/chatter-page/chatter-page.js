import React, { Component } from "react";
import { PanelGroup, Panel, Button } from "react-bootstrap";
import { getSummary } from "../Helpers";
import MessageModal from "../sub-components/messageModalComponent";
import MessageComponent from "../sub-components/MessageComponent";

class ChatterPage extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.messages !== nextProps.messages) {
      return {
        messages: nextProps.messages
      };
    } else return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
      showMessageModal: false,
      newName: "",
      newTitle: "",
      newMessage: ""
    };
  }
  closeModal = () => {
    this.setState({ showMessageModal: false });
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handlePostMessage = e => {
    this.props.postMessage(
      this.state.newName,
      this.state.newMessage,
      this.state.newTitle
    );
    this.setState({ showMessageModal: false });
  };
  render() {
    return (
      <React.Fragment>
        <PanelGroup accordion id="message-accordion">
          {this.state.messages &&
            Object.values(this.state.messages).map((message, index) => {
              console.log(message);
              return (
                <MessageComponent key={index} message={message} index={index} />
              );
            })}
        </PanelGroup>
        {this.state.showMessageModal ? (
          <MessageModal
            closeModal={this.closeModal}
            handlePostMessage={this.handlePostMessage}
            handleInputChange={this.handleInputChange}
          />
        ) : null}
        <Button onClick={() => this.setState({ showMessageModal: true })}>
          New Message
        </Button>
      </React.Fragment>
    );
  }
}

export default ChatterPage;
