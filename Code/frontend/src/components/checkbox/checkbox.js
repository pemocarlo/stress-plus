import React from "react";

export default function Checkbox(props) {
  return (
    <div className="checkbox">
      <label>
        {props.label}
        <input
          type="checkbox"
          checked={props.isChecked}
          name={props.name}
          onChange={(e) => props.onChange(props.name, e.target.checked)}
        />
      </label>
    </div>
  );
}
