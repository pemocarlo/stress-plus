import React from "react";

import TextInput from "components/text-input/text-input";

export default function MessageSettings(props) {
  const onChange = (name, value) => props.updateSettings(props.id, name, value);

  return (
    <div>
      <TextInput name="title" label={"title"} value={props.title} onChange={onChange} />
    </div>
  );
}
