import React from "react";
import Card from "react-bootstrap/Card";
import {useTranslation} from "react-i18next";

import IconButton from "components/icon-button/icon-button";
import "./default-start.scss";

export default function DefaultStart(props) {
  const {settings, onFinished} = props;
  const {t} = useTranslation();

  return (
    <div className="start">
      <div className="container-fluid">
        <div className="container" id="textpart">
          <Card className="card">
            <Card.Header id="welcometext">
              <h1>
                {t("home.welcome")}
                {t("home.stress")}
                <sup id="plus">+</sup>
              </h1>
              <div className="row">
                <h5>{t("home.tagline")}</h5>
              </div>
            </Card.Header>
            <Card.Body id="welcome">
              <div className="row">
                <p className="message">{settings.message}</p>
              </div>
              <div className="row">
                <IconButton endIcon="play" onClick={onFinished}>
                  {t("home.buttonStart")}
                </IconButton>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
