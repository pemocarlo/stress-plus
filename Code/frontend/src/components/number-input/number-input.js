import React from "react";

export default function NumberInput(props) {
  return (
    <div className="number-input">
      <label>
        {props.label}
        <input type="number" value={props.value} name={props.name} onChange={props.onChange} />
      </label>
    </div>
  );
}
