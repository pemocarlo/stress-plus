import React from "react";

import "./text-input.scss";

export default function TextInput(props) {
  return (
    <div className="text-input">
      <label>
        {props.label}
        <input
          type="text"
          value={props.value}
          name={props.name}
          onChange={(e) => props.onChange(props.name, e.target.value)}
          disabled={props.disabled || false}
        />
      </label>
    </div>
  );
}
