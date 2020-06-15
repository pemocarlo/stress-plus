import React from "react";
import {useTranslation} from "react-i18next";

import MultilineTextInput from "components/multiline-text-input/multiline-text-input";
import TextInput from "components/text-input/text-input";

export default function MessageSettings(props) {
  const {t} = useTranslation();
  const onChange = (name, value) => props.updateSettings(props.id, name, value);

  return (
    <div>
      <TextInput
        name="title"
        label={t(`editor.${props.dndType}.items.${props.type}.title`)}
        value={props.title}
        onChange={onChange}
      />
      <MultilineTextInput
        name="message"
        label={t(`editor.${props.dndType}.items.${props.type}.message`)}
        value={props.message}
        onChange={onChange}
      />
      <TextInput
        name="buttonText"
        label={t(`editor.${props.dndType}.items.${props.type}.buttonText`)}
        value={props.buttonText}
        onChange={onChange}
      />
    </div>
  );
}
