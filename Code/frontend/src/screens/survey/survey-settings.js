import React from "react";
import {useTranslation} from "react-i18next";

import TextInput from "components/text-input/text-input";

export default function SurveySettings(props) {
  const {t} = useTranslation();
  const onChange = (name, value) => props.updateSettings(props.id, name, value);

  return (
    <div>
      <TextInput
        name="title"
        label={t(`editor.${props.dndType}.items.${props.type}.title`)}
        value={props.title}
        onChange={onChange}
        required
      />
      <TextInput
        name="buttonText"
        label={t(`editor.${props.dndType}.items.${props.type}.buttonText`)}
        value={props.buttonText}
        onChange={onChange}
        required
      />
    </div>
  );
}
