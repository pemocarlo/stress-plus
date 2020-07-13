import React from "react";

import "./dialpad.scss";

export default function Dialpad(props) {
  const buttons = [...new Array(10)].map((_, i) => (
    <button className={`button${i}`} onClick={() => props.callback(i)} disabled={props.disabled} key={i}>
      {i}
    </button>
  ));
  return <div className="dialpad">{buttons}</div>;
}
