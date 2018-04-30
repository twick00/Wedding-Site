import React, { Component } from "react";
import "./App.css";
import LandingPage from "./components/landing-page/LandingPage";
import LoginPage from "./components/landing-page/LoginPage";
import { Navbar, NavItem, Nav, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Route, Redirect, Switch } from "react-router-dom";
import { firebaseApp } from "./base";
import firebase from "firebase";
import ChatterPage from "./components/chatter-page/chatter-page";
import moment from "moment";

class App extends Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      fullName: null,
      email: null
    };
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Signed In - " + user.uid);
        let userInfo = firebase.database().ref("users/" + user.uid);
        userInfo.on("value", snap => {
          this.setState({
            uid: user.uid,
            email: snap.val().email,
            fullName: snap.val().fullName
          });
        });
      } else {
        console.log("Signed out");
      }
    });
  }
  componentWillMount() {
    this.messages = firebase.database().ref("messages/");
    this.messages.on("value", message => {
      console.log(message.val());
      this.setState({ messages: message.val() });
    });
    console.log(this.state.messages);
  }
  authHandler = async (email, fullName, authData) => {
    console.log(email, fullName, authData.user.uid);
    await firebase
      .database()
      .ref("users/" + authData.user.uid)
      .set({
        fullName: fullName,
        email: email
      });
    await this.setState({
      uid: authData.user.uid,
      fullName: fullName,
      email: email
    });
  };
  handleLogout = () => {
    firebase.auth().signOut();
  };
  handleRegister = (authProvider, fullName = null, email = null) => {
    const authProviderFilled = new firebase.auth[
      `${authProvider}AuthProvider`
    ]();
    firebaseApp
      .auth()
      .signInWithPopup(authProviderFilled)
      .then(authData => {
        if (fullName && email) {
          this.authHandler(email, fullName, authData);
        } else {
          this.setState({ uid: authData.user.uid });
        }
      });
  };
  postMessage = (title, message, name) => {
    if (this.state.uid) {
      firebase
        .database()
        .ref("messages/" + Date.now())
        .set({
          title: title,
          message: message,
          name: name,
          userInfo: {
            fullName: this.state.fullName,
            email: this.state.email,
            datePosted: moment().toString()
          }
        });
    } else console.log("Not logged in");
  };

  render() {
    const tooltip = (
      <Tooltip id="tooltip">
        <strong>Please Login</strong> to leave a message.
      </Tooltip>
    );
    const loggedBool = this.state.uid ? (
      <NavItem eventKey={2} onClick={this.handleLogout}>
        Logout
      </NavItem>
    ) : (
      <NavItem eventKey={2} href="/login">
        Login/Register
      </NavItem>
    );
    const messageBool = this.state.uid ? (
      <NavItem eventKey={1} href="/message">
        Leave A Message
      </NavItem>
    ) : (
      <NavItem eventKey={1} href="#">
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="bottom"
          overlay={tooltip}
        >
          <strike>Leave A Message</strike>
        </OverlayTrigger>
      </NavItem>
    );
    return (
      <React.Fragment>
        <Navbar
          style={{ borderRadius: "0px", margin: "0px" }}
          inverse
          collapseOnSelect
        >
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Tyler & Lacey</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {messageBool}
              <NavItem
                eventKey={2}
                href="https://www.theknot.com/us/lacey-smith-and-tyler-wickline-jul-2018"
              >
                Registry
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Link Right
              </NavItem>

              {loggedBool}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <LandingPage />;
            }}
          />
          <Route
            exact
            path="/login"
            render={() =>
              this.state.uid ? (
                <Redirect to="/" />
              ) : (
                <LoginPage handleRegister={this.handleRegister} />
              )
            }
          />
          <Route
            path="/message"
            render={() => {
              return (
                <ChatterPage
                  postMessage={this.postMessage}
                  messages={this.state.messages}
                />
              );
            }}
          />
          <Route render={() => <h1>404 Page Not Found</h1>} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
