import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {v4 as uuid} from "uuid";

export default function SelectInput(props) {
  const [id] = useState(() => uuid());
  return (
    <Form.Group controlId={id}>
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
