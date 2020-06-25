import React from "react";
import {useTranslation} from "react-i18next";

import NumberInput from "components/number-input/number-input";

export default function ScreenFrezzeSettings(props) {
  const {t} = useTranslation();
  const onChange = (name, value) => props.updateSettings(props.id, name, value);

  return (
    <div>
      <NumberInput
        name="startTime"
        label={t("editor.overlay.items.chatbot.startTime")}
        value={props.startTime}
        onChange={onChange}
        required
        min={0}
      />
    </div>
  );
}
