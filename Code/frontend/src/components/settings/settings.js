import React, {useState} from "react";

import Checkbox from "components/checkbox/checkbox";
import NumberInput from "components/number-input/number-input";
import "./settings.css";

const defaultTestConfig = {
  answerTimeout: 5, //in seconds
  waitTime: 2, // in seconds
  enableSound: false,
  availableConditions: {enableExperimental: 10},
  difficulty: 0,
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
    const checkboxList = conditionsParent.querySelectorAll("input[type=checkbox]");
    const inputNumberList = conditionsParent.querySelectorAll("input[type=number]");

    const selectedConditions = Array.from(checkboxList)
      .filter((element) => element.checked)
      .map((element) => element.name);

    inputNumberList.forEach((element) => (element.disabled = !selectedConditions.includes(element.name)));

    const selectedInput = Array.from(inputNumberList)
      .filter((element) => !element.disabled)
      .map((element) => element.value);

    setTestConfig({
      ...testConfig,
      availableConditions: Object.fromEntries(
        selectedConditions.map((_, i) => [selectedConditions[i], selectedInput[i]])
      ),
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
          isChecked={Object.prototype.hasOwnProperty.call(testConfig.availableConditions, "enableControl")}
          onChange={handleConditionInputChange}
        />
        <Checkbox
          name="enableExperimental"
          label="Experimental"
          isChecked={Object.prototype.hasOwnProperty.call(testConfig.availableConditions, "enableExperimental")}
          onChange={handleConditionInputChange}
        />
        <NumberInput
          name="enableControl"
          label="Control time"
          value={testConfig.availableConditions["enableControl"] || ""}
          onChange={handleConditionInputChange}
          disabled={!Object.prototype.hasOwnProperty.call(testConfig.availableConditions, "enableControl")}
        />
        <NumberInput
          name="enableExperimental"
          label="Experimental time"
          value={testConfig.availableConditions["enableExperimental"] || ""}
          onChange={handleConditionInputChange}
          disabled={!Object.prototype.hasOwnProperty.call(testConfig.availableConditions, "enableExperimental")}
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
      <div>
        <NumberInput
          name="difficulty"
          label="Difficulty (Easy: 0; Hard: 4)"
          value={testConfig.difficulty}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={() => props.startTest(testConfig)}>Start</button>
    </div>
  );
}
