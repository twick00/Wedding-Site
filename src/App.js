import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./components/landing-page/LandingPage";
import LoginPage from "./components/landing-page/LoginPage";
import { Navbar, NavItem, MenuItem, NavDropdown, Nav } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import base, { firebaseApp } from "./base";
import firebase from "firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      fullName: null,
      email: null
    };
    this.authHandler.bind(this);
    this.getFormInfo.bind(this);
  }

  handleLogout = async () => {
    await this.setState({ uid: null });
    console.log(this.state.uid);
  };

  authHandler = async authData => {
    await this.setState({
      uid: authData.user.uid
    });
    firebase
      .database()
      .ref("users/" + this.state.uid)
      .set({
        email: this.state.email,
        fullName: this.state.fullName
      })
      .catch(error => {
        alert(error);
      });
  };
  getFormInfo = async (field, info) => {
    await this.setState({ [field]: info });
  };
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
      .then();
  };

  render() {
    const loggedBool = this.state.uid ? (
      <NavItem eventKey={2} onClick={this.handleLogout}>
        Logout
      </NavItem>
    ) : (
      <NavItem eventKey={2} href="/login">
        Login
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
              <NavItem disabled eventKey={1} href="#">
                <strike> Leave A Message </strike>
              </NavItem>
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
              <LoginPage
                getFormInfo={this.getFormInfo}
                authHandler={this.authHandler}
                authenticate={this.authenticate}
              />
            )
          }
        />
      </React.Fragment>
    );
  }
}

export default App;
