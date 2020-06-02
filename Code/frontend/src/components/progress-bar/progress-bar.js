import React from "react";

import "./progress-bar.scss";

export default function ProgressBar(props) {
  const Filler = (props) => <div className="filler" style={{width: `${props.percentage}%`}} />;

  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} />
    </div>
  );
}
