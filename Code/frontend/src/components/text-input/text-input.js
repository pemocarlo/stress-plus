import React from "react";
import {Form} from "react-bootstrap";

export default function TextInput(props) {
  return (
    <Form.Group controlId="text-input">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type="text"
        value={props.value}
        name={props.name}
        onChange={(e) => props.onChange(props.name, e.target.value)}
        disabled={props.disabled || false}
      />
    </Form.Group>
  );
}
