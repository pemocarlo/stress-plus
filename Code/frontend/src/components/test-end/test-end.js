import React from "react";
import {useTranslation} from "react-i18next";

import MainLayout from "components/main-layout/main-layout";
import "./test-end.scss";

export default function TestEnd() {
  const {t} = useTranslation();
  return (
    <MainLayout>
      <div className="container" id="test-end">
        <div className="row">
          <div className="message">{t("end.message")}</div>
        </div>
      </div>
    </MainLayout>
  );
}
