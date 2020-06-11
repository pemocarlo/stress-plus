import React from "react";
import {Form} from "react-bootstrap";

export default function SelectInput(props) {
  return (
    <Form.Group controlId="select-input">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        as="select"
        value={props.value}
        name={props.name}
        onChange={(e) => props.onChange(props.name, e.target.value)}
      >
        {props.values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
