import React from "react";

export default function Checkbox(props) {
  return (
    <div className="checkbox">
      <label>
        {props.label}
        <input type="checkbox" checked={props.isChecked} name={props.name} onChange={props.onChange} />
      </label>
    </div>
  );
}
