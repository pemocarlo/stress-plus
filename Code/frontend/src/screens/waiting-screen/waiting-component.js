import React, {useEffect} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";

import "./waiting-component.scss";

export default function WaitingComponent(props) {
  const {settings, onFinished} = props;
  const waitTime = settings.wait_time;

  useEffect(() => {
    const id = setTimeout(() => {
      onFinished();
    }, parseInt(waitTime) * 1000);
    return () => clearTimeout(id);
  }, [onFinished, waitTime]);

  return (
    <Jumbotron className="waiting-screen">
      <h1>{settings.title}</h1>
      <p className="message">{settings.message}</p>
      <div className="spinners">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="info" />
      </div>
    </Jumbotron>
  );
}
