import React, {useState} from "react";

import Checkbox from "components/checkbox/checkbox";
import NumberInput from "components/number-input/number-input";
import "./settings.css";

const defaultTestConfig = {
  answerTimeout: 5, //in seconds
  waitTime: 2, // in seconds
  enableSound: false,
  enableControl: false,
};

function getInputValue(element) {
  switch (element.type) {
    case "checkbox": return element.checked;
    case "number": return parseInt(element.value);
    default: return element.value;
  }
}

export default function Settings(props) {
  const [testConfig, setTestConfig] = useState(defaultTestConfig);

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
      <div>
        <Checkbox
          name="enableControl"
          label="Control"
          isChecked={testConfig.enableControl}
          onChange={handleInputChange}
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
