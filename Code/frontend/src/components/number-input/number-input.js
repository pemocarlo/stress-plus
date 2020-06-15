import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {v4 as uuid} from "uuid";

export default function NumberInput(props) {
  const [id] = useState(() => uuid());
  return (
    <Form.Group controlId={id}>
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
