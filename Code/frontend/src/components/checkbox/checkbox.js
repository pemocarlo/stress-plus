import React from "react";
import {Form} from "react-bootstrap";

export default function Checkbox(props) {
  return (
    <Form.Group controlId="checkbox-input">
      <Form.Check
        type="checkbox"
        checked={props.value}
        label={props.label}
        name={props.name}
        onChange={(e) => props.onChange(props.name, e.target.checked)}
        disabled={props.disabled || false}
      />
    </Form.Group>
  );
}
