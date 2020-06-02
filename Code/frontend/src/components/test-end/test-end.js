import React from "react";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Button from "react-bootstrap/Button";

import "./test-end.scss";

export default function TestEnd() {
  const {t} = useTranslation();
  const history = useHistory();
  return (
    <div className="TestEnd">
      <div className="container">
        <div className="row">
          <div className="message">{t("end.message")}</div>
        </div>
        <div className="row">
          <div className="buttonSettings">
            <Button onClick={() => history.push("/")}>{t("end.button")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
