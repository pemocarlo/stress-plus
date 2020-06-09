import React from "react";

import Checkbox from "components/checkbox/checkbox";
import TextInput from "components/text-input/text-input";

export default function MathSettings(props) {
  const onChange = (name, value) => props.updateSettings(props.id, name, value);

  return (
    <div>
      <Checkbox name="isControl" label={"is Control?"} isChecked={props.isControl} onChange={onChange} />
      <TextInput name="title" label={"title"} value={props.title} onChange={onChange} />
    </div>
  );
}
