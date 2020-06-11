import React from "react";
import {Form} from "react-bootstrap";

export default function NumberInput(props) {
  return (
    <Form.Group controlId="number-input">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type="number"
        value={props.value}
        name={props.name}
        onChange={(e) => props.onChange(props.name, parseInt(e.target.value))}
        disabled={props.disabled || false}
      />
    </Form.Group>
  );
}
