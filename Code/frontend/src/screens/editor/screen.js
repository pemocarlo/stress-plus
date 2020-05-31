import React from "react";
import "./screen.css";

export default function Screen(props) {
  return <div className="Screen">{props.screen.type}</div>;
}
