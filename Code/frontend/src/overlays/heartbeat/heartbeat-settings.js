import React from "react";
import {useTranslation} from "react-i18next";

import NumberInput from "components/number-input/number-input";
import OverlayPositionInput from "components/overlay-position-input/overlay-position-input";

export default function HeartbeatSettings(props) {
  const {t} = useTranslation();
  const onChange = (name, value) => props.updateSettings(props.id, name, value);
  return (
    <div>
      <NumberInput
        name="heartbeatStart"
        label={t("editor.overlay.items.heartbeat.heartbeatStart")}
        value={props.heartbeatStart}
        onChange={onChange}
        required
        min={4}
      />
      <OverlayPositionInput
        name="position"
        label={t("editor.overlay.items.heartbeat.position")}
        value={props.position}
        onChange={onChange}
      />
    </div>
  );
}
