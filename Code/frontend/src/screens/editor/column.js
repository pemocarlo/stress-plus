import React from "react";
import Screen from "./screen";
import "./column.css";

export default function Column(props) {
  return (
    <div className="Column">
      <h3>{props.column.title}</h3>
      <div className="screenList">
        {props.screens.map((screen) => (
          <Screen key={screen.id} screen={screen} />
        ))}
      </div>
    </div>
  );
}
