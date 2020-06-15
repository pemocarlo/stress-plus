import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {v4 as uuid} from "uuid";

export default function TextInput(props) {
  const [id] = useState(() => uuid());
  return (
    <Form.Group controlId={id}>
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
