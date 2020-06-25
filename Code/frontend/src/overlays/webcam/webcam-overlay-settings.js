import React from "react";
import {useTranslation} from "react-i18next";

import OverlayPositionInput from "components/overlay-position-input/overlay-position-input";

export default function WebcamOverlaySettings(props) {
  const {t} = useTranslation();
  const onChange = (name, value) => props.updateSettings(props.id, name, value);

  return (
    <div>
      <OverlayPositionInput
        name="position"
        label={t("editor.overlay.items.webcam.position")}
        value={props.position}
        onChange={onChange}
      />
    </div>
  );
}
