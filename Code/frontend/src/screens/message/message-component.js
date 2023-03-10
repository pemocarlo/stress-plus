import React from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

import "./message-component.scss";

export default function MessageComponent(props) {
  const {settings, onFinished} = props;
  return (
    <Jumbotron className="message-screen">
      <h1>{settings.title}</h1>
      <p className="message">{settings.message}</p>
      <p>
        <Button variant="primary" onClick={onFinished}>
          {settings.buttonText}
        </Button>
      </p>
    </Jumbotron>
  );
}
