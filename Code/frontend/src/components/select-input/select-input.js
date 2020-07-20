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
        onChange={(e) => props.onChange(props.name, props.values[e.target.value])}
      >
        {props.values.map((value, index) => (
          <option key={index} value={index}>
            {value.toString()}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
