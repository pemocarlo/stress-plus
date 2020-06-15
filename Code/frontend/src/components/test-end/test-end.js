import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

import MainLayout from "components/main-layout/main-layout";
import "./test-end.scss";

export default function TestEnd() {
  const {t} = useTranslation();
  const history = useHistory();
  return (
    <MainLayout>
      <div className="container" id="test-end">
        <div className="row">
          <div className="message">{t("end.message")}</div>
        </div>
        <div className="row">
          <div className="buttonSettings">
            <Button onClick={() => history.push("/")}>
              {t("end.button")} <FontAwesomeIcon icon="cog" />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
