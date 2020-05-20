import React from "react";

import ArithmeticTest from "components/ArithmeticTest/ArithmeticTest";
import "./stress-app.css";

const props = {seconds: 5, renderStepProgressms: 50};

export default function StressApp() {
  return <ArithmeticTest {...props} />;
}
