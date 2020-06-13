import React from "react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./home.scss";

export default function Home() {
  const {t} = useTranslation();
  const history = useHistory();
  return (
    <div className="home">
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
            <Card.Body id="welcomebutton">
              <div className="row">
                <Button className="btn" onClick={() => history.push("/editor")}>
                  {t("home.buttonEditor")}
                  <FontAwesomeIcon icon="edit" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
