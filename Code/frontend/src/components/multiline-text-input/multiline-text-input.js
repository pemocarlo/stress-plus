import React, {useState, useRef} from "react";
import Form from "react-bootstrap/Form";
import {useTranslation} from "react-i18next";
import {v4 as uuid} from "uuid";

export default function MultilineTextInput(props) {
  const {t} = useTranslation();
  const [id] = useState(() => uuid());
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef(null);

  const onChange = (e) => {
    props.onChange(props.name, e.target.value);
    setIsValid(inputRef.current.validity.valid);
  };

  return (
    <Form.Group controlId={id} className={isValid ? "" : "was-validated"}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        ref={inputRef}
        as="textarea"
        rows={props.rows || 3}
        value={props.value}
        name={props.name}
        onChange={onChange}
        disabled={props.disabled}
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLength}
        pattern={props.pattern}
      />
      <Form.Control.Feedback type="invalid">
        {props.invalidFeedback || t("form.feedback.invalid")}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
