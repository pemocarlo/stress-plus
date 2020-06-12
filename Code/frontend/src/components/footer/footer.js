import React from "react";
import {useTranslation} from "react-i18next";

import "./footer.scss";

export default function Footer() {
  const {t} = useTranslation();
  return (
    <div className="footer-stress">
      <hr className="hr" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            {" "}
            A. Aravindan, A. Ohlmann, C. Perez, J. Schuell, T. Vogel <span>{t("footer.and")}</span> M. Nissen, M. Zuerl
          </div>
          <div className="col-3 font-weight-bold">stress+</div>
          <div className="col-2">Version 1.0 </div>
          <div className="col-2">2020</div>
        </div>
      </div>
    </div>
  );
}
