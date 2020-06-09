import React from "react";

import "./number-input.scss";

export default function NumberInput(props) {
  return (
    <div className="number-input">
      <label>
        {props.label}
        <input
          type="number"
          value={props.value}
          name={props.name}
          onChange={(e) => props.onChange(props.name, parseInt(e.target.value))}
          disabled={props.disabled || false}
        />
      </label>
    </div>
  );
}
