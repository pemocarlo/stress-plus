import React from "react";
import Card from "react-bootstrap/Card";
import {useTranslation} from "react-i18next";

import "./end.scss";

export default function End(props) {
  const {settings} = props;
  const {t} = useTranslation();

  return (
    <div className="end">
      <div className="container-fluid">
        <div className="container" id="textpart">
          <Card className="card">
            <Card.Header id="endtext">
              <div className="row">
                <h1>{t("end.headline")}</h1>
              </div>
              <div className="row">
                <h3 className="message">{settings.message}</h3>
              </div>
            </Card.Header>
            <Card.Body id="finished">
              <div className="row">
                <h6>
                  {t("home.stress")}
                  <sup id="plus">+</sup>
                </h6>
              </div>
              <div className="row">
                <h6>{t("footer.names")}</h6>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
