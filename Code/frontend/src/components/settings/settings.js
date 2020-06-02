import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

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
  const {t} = useTranslation();
  const [testConfig, setTestConfig] = useState(defaultTestConfig);
  const history = useHistory();

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
      <h1>{t("settings.title")}</h1>
      <div>
        <Checkbox
          name="enableSound"
          label={t("settings.enableSound")}
          isChecked={testConfig.enableSound}
          onChange={handleInputChange}
        />
      </div>
      <div className="conditions">
        <Checkbox
          name="enableControl"
          label={t("settings.enableControl")}
          isChecked={Object.prototype.hasOwnProperty.call(testConfig.availableConditions, "enableControl")}
          onChange={handleConditionInputChange}
        />
        <Checkbox
          name="enableExperimental"
          label={t("settings.enableExperimental")}
          isChecked={Object.prototype.hasOwnProperty.call(testConfig.availableConditions, "enableExperimental")}
          onChange={handleConditionInputChange}
        />
        <NumberInput
          name="enableControl"
          label={t("settings.controlTime")}
          value={testConfig.availableConditions["enableControl"] || ""}
          onChange={handleConditionInputChange}
          disabled={!Object.prototype.hasOwnProperty.call(testConfig.availableConditions, "enableControl")}
        />
        <NumberInput
          name="enableExperimental"
          label={t("settings.experimentalTime")}
          value={testConfig.availableConditions["enableExperimental"] || ""}
          onChange={handleConditionInputChange}
          disabled={!Object.prototype.hasOwnProperty.call(testConfig.availableConditions, "enableExperimental")}
        />
      </div>
      <div>
        <NumberInput
          name="answerTimeout"
          label={t("settings.answerTimeout")}
          value={testConfig.answerTimeout}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <NumberInput
          name="waitTime"
          label={t("settings.waitTime")}
          value={testConfig.waitTime}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <NumberInput
          name="difficulty"
          label={t("settings.difficulty")}
          value={testConfig.difficulty}
          onChange={handleInputChange}
        />
      </div>
      <Button onClick={() => props.startTest(testConfig)}>{t("settings.startButton")}</Button>
      <div>
        <Button onClick={() => history.push("/editor")}>{"Go to editor"}</Button>
      </div>
    </div>
  );
}
