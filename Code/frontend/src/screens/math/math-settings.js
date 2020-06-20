import React from "react";
import {useTranslation} from "react-i18next";

import Checkbox from "components/checkbox/checkbox";
import NumberInput from "components/number-input/number-input";
import SelectInput from "components/select-input/select-input";

export default function MathSettings(props) {
  const onChange = (name, value) => props.updateSettings(props.id, name, value);
  const {t} = useTranslation();

  return (
    <div>
      <Checkbox name="enableSound" label={t("settings.enableSound")} value={props.enableSound} onChange={onChange} />
      <Checkbox name="isControl" label={t("settings.isControl")} value={props.isControl} onChange={onChange} />
      <NumberInput
        name="testTotalTime"
        label={t("settings.totalTime")}
        value={props.testTotalTime}
        onChange={onChange}
        required
        min={1}
      />
      <NumberInput
        name="answerTimeout"
        label={t("settings.answerTimeout")}
        value={props.answerTimeout}
        onChange={onChange}
        required
        min={1}
      />

      <NumberInput
        name="waitTime"
        label={t("settings.waitTime")}
        value={props.waitTime}
        onChange={onChange}
        required
        min={1}
      />

      <SelectInput
        name="difficulty"
        label={t("settings.difficulty")}
        value={props.difficulty}
        onChange={onChange}
        required
        values={[0, 1, 2, 3, 4]}
      />
    </div>
  );
}
