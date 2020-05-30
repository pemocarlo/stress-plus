import React from "react";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

import "./test-end.css";

export default function TestEnd() {
  const {t} = useTranslation();
  const history = useHistory();
  return (
    <div className="TestEnd">
      <div className="message">{t("end.message")}</div>
      <div className="buttonSettings">
        <button onClick={() => history.push("/")}>{t("end.button")}</button>
      </div>
    </div>
  );
}
