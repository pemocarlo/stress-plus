import React from "react";
import "./screen.css";

export default function Screen(props) {
  return (
    <div className="Task">
      <h3>{props.column.title}</h3>
      <div className="screenList">tasks go here</div>
    </div>
  );
}
