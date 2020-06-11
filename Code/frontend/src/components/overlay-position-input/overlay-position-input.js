import React from "react";

import SelectInput from "components/select-input/select-input";

const positionValues = [
  "center",
  "top",
  "bottom",
  "right",
  "left",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

export default function OverlayPositionInput(props) {
  return <SelectInput {...props} values={positionValues} />;
}
