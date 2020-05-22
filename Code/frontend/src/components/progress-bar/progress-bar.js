import React from "react";

import "./progress-bar.css";

const ProgressBar = (props) => (
  <div className="progress-bar">
    <Filler percentage={props.percentage} />
  </div>
);

export default ProgressBar;

const Filler = (props) => (
  <div className="filler" style={{width: `${props.percentage}%`}} />
);
