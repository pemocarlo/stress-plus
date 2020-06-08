import React, {useState} from "react";

import Checkbox from "components/checkbox/checkbox";
import TextInput from "components/text-input/text-input";

function getInputValue(element) {
  switch (element.type) {
    case "checkbox":
      return element.checked;
    case "number":
      return parseInt(element.value);
    default:
      return element.value;
  }
}

export default function MathSettings(props) {
  const [testConfig, setTestConfig] = useState(props);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = getInputValue(target);
    const name = target.name;
    setTestConfig({
      ...testConfig,
      [name]: value,
    });
    testConfig.updateSettings(props.id, {
      ...testConfig,
      [name]: value,
    });
  };

  return (
    <div className="Settings">
      <Checkbox name="isControl" label={"is Control?"} isChecked={testConfig.isControl} onChange={handleInputChange} />
      <div>
        <TextInput name="title" label={"title"} value={testConfig.title} onChange={handleInputChange} />
      </div>
    </div>
  );
}
