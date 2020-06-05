import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

import Checkbox from "components/checkbox/checkbox";
import NumberInput from "components/number-input/number-input";
import Footer from "components/footer/footer";
import "./settings.css";

const defaultTestConfig = {
  answerTimeout: 5, //in seconds
  waitTime: 2, // in seconds
  testTotalTime: 10, // in seconds
  enableSound: false,
  isControl: false,
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
      <Checkbox
        name="isControl"
        label={t("settings.isControl")}
        isChecked={testConfig.isControl}
        onChange={handleInputChange}
      />
      <div>
        <NumberInput
          name="testTotalTime"
          label={t("settings.totalTime")}
          value={testConfig.testTotalTime}
          onChange={handleInputChange}
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
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
