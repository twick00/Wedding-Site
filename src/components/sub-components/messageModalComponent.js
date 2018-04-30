import {
  Modal,
  FormGroup,
  FormControl,
  Col,
  Row,
  Form,
  ControlLabel,
  Button
} from "react-bootstrap";
import React from "react";
export default function MessageModal(props) {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>New Message</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl
                  name="newName"
                  onChange={e => props.handleInputChange(e)}
                  componentClass="input"
                  placeholder="Enter Your Name"
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalTitle">
              <Col componentClass={ControlLabel} sm={2}>
                Title
              </Col>
              <Col sm={10}>
                <FormControl
                  required
                  name="newTitle"
                  onChange={e => props.handleInputChange(e)}
                  componentClass="input"
                  placeholder="Enter A Title"
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalMessage">
              <Col componentClass={ControlLabel} sm={2}>
                Message
              </Col>
              <Col sm={10}>
                <FormControl
                  name="newMessage"
                  onChange={e => props.handleInputChange(e)}
                  componentClass="textarea"
                  placeholder="Enter Your Message"
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => props.closeModal()}>Close</Button>
          <Button onClick={e => props.handlePostMessage(e)} bsStyle="primary">
            Post
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
