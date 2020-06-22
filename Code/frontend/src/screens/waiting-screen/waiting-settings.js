import React from "react";
import {useTranslation} from "react-i18next";

import MultilineTextInput from "components/multiline-text-input/multiline-text-input";
import NumberInput from "components/number-input/number-input";
import TextInput from "components/text-input/text-input";

export default function WaitingSettings(props) {
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
      <MultilineTextInput
        name="message"
        label={t(`editor.${props.dndType}.items.${props.type}.message`)}
        value={props.message}
        onChange={onChange}
      />
      <NumberInput
        name="wait_time"
        label={t(`editor.${props.dndType}.items.${props.type}.wait_time`)}
        value={props.wait_time}
        onChange={onChange}
        required
        min={1}
      />
    </div>
  );
}
