import React from "react";
import { Panel } from "react-bootstrap";
import { getSummary } from "../Helpers";

export default function MessageComponent(props) {
  return (
    <Panel key={props.index} eventKey="1">
      <Panel.Heading>
        <Panel.Title toggle>
          From: {props.message.name} - {getSummary(props.message.message)}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body collapsible>{props.message.message}</Panel.Body>
    </Panel>
  );
}
