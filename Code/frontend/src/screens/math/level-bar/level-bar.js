import React from "react";
import {useTranslation} from "react-i18next";

import "./level-bar.scss";

export default function Levelbar(props) {
  const {t} = useTranslation();
  return (
    <div className="Levelbar">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="triangle_down" style={{marginLeft: `${props.average_score}%`}}>
              <span>{t("levelBar.average")}</span>
              <div className="triangle"></div>
            </div>
          </div>
        </div>

        <div className="row p-0">
          <div className="col-12 p-0">
            <div className="meter_red bg-danger">{t("levelBar.BAD")}</div>
            <div className="meter_yellow bg-warning">{t("levelBar.ok")}</div>
            <div className="meter_green bg-success">{t("levelBar.good")}</div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="triangle_up" style={{marginLeft: `${props.your_score}%`}}>
              <div className="triangle"></div>
              <span>{t("levelBar.you")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
