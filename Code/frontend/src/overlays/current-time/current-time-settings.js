import React from "react";
import {useTranslation} from "react-i18next";

import OverlayPositionInput from "components/overlay-position-input/overlay-position-input";

export default function CurrentTimeSettings(props) {
  const {t} = useTranslation();
  const onChange = (name, value) => props.updateSettings(props.id, name, value);

  return (
    <div>
      <OverlayPositionInput
        name="position"
        label={t("editor.overlay.items.currentTime.position")}
        value={props.position}
        onChange={onChange}
      />
    </div>
  );
}
