import React, { Component } from "react";
import {
  Form,
  Row,
  Col,
  ControlLabel,
  FormControl,
  Button,
  FormGroup,
  Radio,
  Tabs,
  Tab
} from "react-bootstrap";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      fullName: null,
      authProvider: "Google"
    };
  }
  handleRegister = e => {
    e.preventDefault();
    this.props.handleRegister(
      this.state.authProvider,
      this.state.fullName,
      this.state.email
    );
  };
  handleFormChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={{ marginTop: "20px" }} className="container">
        <Tabs defaultActiveKey={1} id="login-register-tabs">
          <Tab eventKey={1} title="Register">
            <Form onSubmit={e => this.handleRegister(e)} horizontal>
              <h3 style={{ textAlign: "center" }}>
                Please enter your name and email so the bride and groom can
                thank you.
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
              <Row
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  textAlign: "center"
                }}
              >
                <h4>Select a Login Option</h4>
                <FormGroup
                  onChange={e =>
                    this.setState({ authProvider: e.target.value })
                  }
                >
                  <Radio defaultChecked name="radioGroup" value="Google" inline>
                    Google
                  </Radio>{" "}
                  <Radio name="radioGroup" value="Twitter" inline>
                    Twitter
                  </Radio>{" "}
                  <Radio name="radioGroup" value="Facebook" inline>
                    Facebook
                  </Radio>
                  <Button style={{ marginLeft: "30px" }} type="submit">
                    Next
                  </Button>
                </FormGroup>
              </Row>
              <Row>
                <Col smOffset={2} sm={10} />
              </Row>
            </Form>
          </Tab>
          <Tab eventKey={2} title="Login">
            <Row style={{ margin: "20px" }}>
              <Col xs={4}>
                <button
                  className="google"
                  onClick={() => this.props.handleRegister("Google")}
                >
                  Log In With Google
                </button>
              </Col>
              <Col xs={4}>
                <button
                  disabled
                  className="twitter"
                  onClick={() => this.props.handleRegister("Twitter")}
                >
                  <strike>Log In With Twitter</strike>
                  <br />
                  Temp Disabled
                </button>
              </Col>
              <Col xs={4}>
                <button
                  disabled
                  className="facebook"
                  onClick={() => this.props.handleRegister("Facebook")}
                >
                  <strike>Log In With Facebook</strike>
                  <br />
                  Temp Disabled
                </button>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default LoginPage;
