import React, {useState, useEffect} from "react";

import Dialpad from "components/dialpad/dialpad";
import ProgressBar from "components/progressBar/ProgressBar";
import "./ArithmeticTest.css";

export default function ArithmeticTest() {
  return (
    <div className="StressApp">
      <div className="stressBar"></div>
      <div className="display arithmetic"></div>
      <ProgressBar percentage={60} />
      {/* <hr /> */}
      <div className="lower-part">
        <div className="results"></div>
        <Dialpad className={`dialpad`} callback={(c) => console.log(c)} />
      </div>
    </div>
  );
}
