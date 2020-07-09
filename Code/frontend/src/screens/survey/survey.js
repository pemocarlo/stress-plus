import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";

import "./survey.scss";

export default function Survey(props) {
  const {t} = useTranslation();
  const {settings, onFinished} = props;

  return (
    <div id="survey-screen">
      <div className="header">
        <div className="col-10">
          <FontAwesomeIcon icon="clipboard-list" />
          {t("editor.screen.items.survey.name")}
        </div>
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
