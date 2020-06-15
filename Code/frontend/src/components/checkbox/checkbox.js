import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {v4 as uuid} from "uuid";

export default function Checkbox(props) {
  const [id] = useState(() => uuid());
  return (
    <Form.Group controlId={id}>
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
