import React, {useState, useRef} from "react";
import Form from "react-bootstrap/Form";
import {useTranslation} from "react-i18next";
import {v4 as uuid} from "uuid";

function isInRange(number, min, max) {
  if (min !== undefined && number < min) {
    return false;
  }
  if (max !== undefined && number > max) {
    return false;
  }
  return true;
}

function getAsIntegerString(text) {
  if (text.length === 0) {
    return ["", false];
  }
  const isNegative = text[0] === "-";
  const newValue = text.replace(/[^0-9]/g, "");
  if (newValue.length === 0) {
    return isNegative ? ["-", false] : ["", false];
  }
  return [isNegative ? `-${newValue}` : newValue, true];
}

export default function NumberInput(props) {
  const {t} = useTranslation();
  const [id] = useState(() => uuid());
  const [isValid, setIsValid] = useState(true);
  const [numberText, setNumberText] = useState(`${props.value}`);
  const inputRef = useRef(null);

  const onChange = (e) => {
    const [newValue, isInteger] = getAsIntegerString(e.target.value);
    setNumberText(newValue);
    if (isInteger) {
      const newNumber = parseInt(newValue);
      props.onChange(props.name, newNumber);
      if (isInRange(newNumber, props.min, props.max)) {
        inputRef.current.setCustomValidity("");
      } else {
        inputRef.current.setCustomValidity("Range mismatch");
      }
    } else {
      //Input is not an integer
      props.onChange(props.name, undefined);
      if (newValue === "-") {
        inputRef.current.setCustomValidity("Not an integer");
      } else {
        inputRef.current.setCustomValidity("");
      }
    }
    setIsValid(inputRef.current.validity.valid);
  };

  return (
    <Form.Group controlId={id} className={isValid ? "" : "was-validated"}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        ref={inputRef}
        type="text"
        value={numberText}
        name={props.name}
        onChange={onChange}
        disabled={props.disabled}
        required={props.required}
      />
      <Form.Control.Feedback type="invalid">
        {props.invalidFeedback || t("form.feedback.invalid")}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
