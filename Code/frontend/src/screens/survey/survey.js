import React from "react";
import Button from "react-bootstrap/Button";

import "./survey.scss";

export default function Survey(props) {
  const {settings, onFinished} = props;

  return (
    <div id="survey-screen">
      <div className="header">
        <div className="col-10"></div>
        <div className="col-2">
          <Button variant="primary" onClick={onFinished} className="buttonSurvey">
            {settings.buttonText}
          </Button>
        </div>
      </div>
      <iframe src={settings.title} title="survey" className="iframeSurvey"></iframe>
    </div>
  );
}
