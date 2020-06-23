import React from "react";
import {useTranslation} from "react-i18next";

import NumberInput from "components/number-input/number-input";

export default function ScreenFrezzeSettings(props) {
  const {t} = useTranslation();
  const onChange = (name, value) => props.updateSettings(props.id, name, value);

  return (
    <div>
      <NumberInput
        name="freezeStart"
        label={t("editor.overlay.items.screenFreeze.freezeStart")}
        value={props.freezeStart}
        onChange={onChange}
        required
        min={0}
      />
      <NumberInput
        name="freezeDisplay"
        label={t("editor.overlay.items.screenFreeze.freezeDisplay")}
        value={props.freezeDisplay}
        onChange={onChange}
        required
        min={1}
      />
    </div>
  );
}
