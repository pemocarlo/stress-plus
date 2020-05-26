import React, {useState} from "react";

import Checkbox from "components/checkbox/checkbox";
import NumberInput from "components/number-input/number-input";
import "./settings.css";

const defaultTestConfig = {
  answerTimeout: 5, //in seconds
  waitTime: 2, // in seconds
  enableSound: false,
  availableConditions: ["enableExperimental"],
};

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

export default function Settings(props) {
  const [testConfig, setTestConfig] = useState(defaultTestConfig);

  const handleConditionInputChange = (event) => {
    const conditionsParent = event.target.closest(".conditions");

    const selectedConditions = Array.from(conditionsParent.querySelectorAll("input[type=checkbox]"))
      .filter((element) => element.checked)
      .map((element) => element.name);

    setTestConfig({
      ...testConfig,
      availableConditions: selectedConditions,
    });
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = getInputValue(target);
    const name = target.name;
    setTestConfig({
      ...testConfig,
      [name]: value,
    });
  };

  return (
    <div className="Settings">
      <h1>Setup your Stress Test</h1>
      <div>
        <Checkbox
          name="enableSound"
          label="Enable sound"
          isChecked={testConfig.enableSound}
          onChange={handleInputChange}
        />
      </div>
      <div className="conditions">
        <Checkbox
          name="enableControl"
          label="Control"
          isChecked={testConfig.availableConditions.includes("enableControl")}
          onChange={handleConditionInputChange}
        />
        <Checkbox
          name="enableExperimental"
          label="Experimental"
          isChecked={testConfig.availableConditions.includes("enableExperimental")}
          onChange={handleConditionInputChange}
        />
      </div>
      <div>
        <NumberInput
          name="answerTimeout"
          label="Answer timeout"
          value={testConfig.answerTimeout}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <NumberInput
          name="waitTime"
          label="Time between questions"
          value={testConfig.waitTime}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={() => props.startTest(testConfig)}>Start</button>
    </div>
  );
}
