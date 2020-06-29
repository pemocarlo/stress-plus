import React from "react";
import {useTranslation} from "react-i18next";

import {VERSION} from "stress-app";
import "./footer.scss";

export default function Footer() {
  const {t} = useTranslation();
  return (
    <div id="footer">
      <hr className="hr" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-5">{t("footer.names")}</div>
          <div className="col-3 font-weight-bold">stress+</div>
          <div className="col-2">Version {VERSION}</div>
          <div className="col-2">2020</div>
        </div>
      </div>
    </div>
  );
}
