import React, { Component } from "react";
import {
  Form,
  Row,
  Col,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.email = React.createRef("");
    this.fullName = React.createRef("");
    console.log(props);
  }

  handleFormChange(e) {
    // e.preventDefault();
    console.log("HANDLE FORM - ", e.target.name);
    // console.log(this.props);
    this.props.getFormInfo(e.target.name, e.target.value);
    // this.props.authHandler(this.email.value, this.fullName.value);
  }
  render() {
    return (
      <div className="container">
        <Form onSubmit={e => this.handleSubmitForm(e)} horizontal>
          <h3 style={{ textAlign: "center" }}>
            Please enter your info again so we can get back to you with a thank
            you.
          </h3>
          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl
                name="email"
                onChange={e => this.handleFormChange(e)}
                type="email"
                placeholder="Please Enter Your Email"
                style={{ width: "90%" }}
                required
                inputRef={ref => {
                  this.email = ref;
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Col componentClass={ControlLabel} sm={2}>
              Full-Name
            </Col>
            <Col sm={10}>
              <FormControl
                name="fullName"
                onChange={e => this.handleFormChange(e)}
                type="text"
                placeholder="Please Enter Your Full Name"
                style={{ width: "90%" }}
                required
                inputRef={ref => {
                  this.fullName = ref;
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Next</Button>
            </Col>
          </Row>
        </Form>
        <h2 style={{ textAlign: "center", margin: "50px" }}>Login</h2>
        <Row>
          <Col xs={4}>
            <button
              className="google"
              onClick={() => this.props.authenticate("Google")}
            >
              Log In With Google
            </button>
          </Col>
          <Col xs={4}>
            <button
              className="twitter"
              onClick={() => this.props.authenticate("Twitter")}
            >
              Log In With Twitter
            </button>
          </Col>
          <Col xs={4}>
            <button
              className="facebook"
              onClick={() =>
                this.props.authenticate(
                  "Facebook",
                  this.email.value,
                  this.fullName.value
                )
              }
            >
              Log In With Facebook
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginPage;
