import React from "react";
import {useTranslation} from "react-i18next";

import MultilineTextInput from "components/multiline-text-input/multiline-text-input";

export default function EndSettings(props) {
  const {t} = useTranslation();
  const onChange = (name, value) => props.updateSettings(props.id, name, value);

  return (
    <div>
      <MultilineTextInput
        name="message"
        label={t(`editor.${props.dndType}.items.${props.type}.message`)}
        value={props.message}
        onChange={onChange}
      />
    </div>
  );
}
